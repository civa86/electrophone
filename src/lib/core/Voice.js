import AudioContext from '../AudioContext'
import * as Modules from '../modules'
import SoundSource from './SoundSource'
import { TYPES } from './Constants'

class Voice {

    constructor (note, modulesConfig, spectrum, updateSpectrum) {
        this.note = note;
        this.modulesConfig = modulesConfig;
        this.modules = {};
        this.soundSources = [];
        this.master = null;
        this.spectrum = spectrum || false;
        this.onSpectrum = updateSpectrum || null;

        if (this.spectrum) {
            this.createSpectrum();
        }
        this.setupModules();
        this.linkModules();
    }

    createSpectrum () {
        this.javascriptNode = AudioContext.createScriptProcessor(2048, 1, 1);
        this.javascriptNode.connect(AudioContext.destination);

        this.analyser = AudioContext.createAnalyser();
        this.analyser.fftSize = 1024;
    }

    setupModules () {
        let modConf,
            m;

        Object.keys(this.modulesConfig).forEach((mod) => {
            modConf = this.modulesConfig[mod];
            if (modConf.type && modConf.props) {
                m = new Modules[modConf.type](modConf.props);
                this.modules[mod] = {
                    type:     modConf.type,
                    instance: m
                };

                if (m.instance instanceof SoundSource) {
                    this.soundSources.push(m);
                } else if (modConf.type === TYPES.MASTER) {
                    this.master = m;
                }
            }
        });
    }

    linkModules () {
        let masterOutput;

        Object.keys(this.modules).forEach((mod) => {
            let currentModule = this.modules[mod].instance,
                currentModuleType = this.modules[mod].type,
                destinationModule,
                source,
                dest;

            if (currentModule.link) {
                destinationModule = this.modules[currentModule.link];
                if (destinationModule && destinationModule.instance) {
                    source = currentModule.getLineOut();
                    dest = destinationModule.instance.getLineIn(currentModuleType, currentModule);
                    //console.log(mod, source, currentModule.link, dest);
                    if (source && dest) {
                        source.connect(dest);
                    }
                }
            }
        });

        masterOutput = this.master.lineOut();
        if (this.spectrum === true && this.analyser) {
            masterOutput.connect(this.analyser);
            this.analyser.connect(AudioContext.destination);
        } else {
            masterOutput.connect(AudioContext.destination);
        }
    }

    noteOn () {
        let m,
            dest,
            frequencyData;

        if (this.spectrum === true && this.javascriptNode) {
            frequencyData =  new Uint8Array(this.analyser.frequencyBinCount);

            this.javascriptNode.onaudioprocess =  () => {
                this.analyser.getByteFrequencyData(frequencyData);
                if (this.onSpectrum && typeof this.onSpectrum === 'function') {
                    this.onSpectrum(frequencyData);
                }
            };
        }

        Object.keys(this.modules).forEach((e) => {
            m = this.modules[e].instance;

            if (typeof m.setEnvelope === 'function') {
                dest = (this.modules[m.link]) ? this.modules[m.link].instance : null;
                m.setEnvelope(dest);
            }
            if (typeof m.setNote === 'function') {
                m.setNote(+this.note);
            }
        });
        Object.keys(this.modules).forEach((e) => {
            m = this.modules[e].instance;
            if (typeof m.noteOn === 'function') {
                m.noteOn();
            }
        });
    }

    noteOff () {
        let release = 0,
            adsr = this.modules.adsr.instance,
            m,
            dest;

        release = adsr.getReleaseTime();

        if (this.spectrum === true && this.javascriptNode) {
            this.javascriptNode.onaudioprocess = null;
        }

        Object.keys(this.modules).forEach((e) => {
            m = this.modules[e].instance;
            if (typeof m.resetEnvelope === 'function') {
                dest = (this.modules[m.link]) ? this.modules[m.link].instance : null;
                m.resetEnvelope(dest);
            }
        });
        Object.keys(this.modules).forEach((e) => {
            m = this.modules[e].instance;
            if (typeof m.noteOff === 'function') {
                m.noteOff(release);
            }
        });
    }

}

export default Voice;
