import * as Modules from '../modules';
import SoundSource from './SoundSource';
import { TYPES } from './Constants';

/**
 * Voice Class
 * @example
 * const v = new Voice(440, AudioContext, { master: { ... }, adsr: { ... } }, null);
 */
class Voice {

    constructor (note, audioContext, modulesConfig, analyser) {
        this.note = note;
        this.modulesConfig = modulesConfig;
        this.modules = {};
        this.soundSources = [];
        this.master = null;
        this.analyser = analyser || null;

        if (audioContext) {
            this.setupModules(audioContext);
            this.linkModules();
        }
    }

    setupModules (audioContext) {
        let modConf,
            m;

        Object.keys(this.modulesConfig).forEach((mod) => {
            modConf = this.modulesConfig[mod];
            if (modConf.type && modConf.props) {
                m = new Modules[modConf.type](audioContext, modConf.props, modConf.type);
                this.modules[mod] = {
                    type: modConf.type,
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

    updateModule (moduleId, props) {
        if (this.modules[moduleId] && this.modules[moduleId].instance) {
            this.modules[moduleId].instance.updateProperties(props);
        }
    }

    removeModule (moduleId) {
        if (this.modules[moduleId] && this.modules[moduleId].instance) {
            this.modules[moduleId].instance.disconnect();
        }
    }

    linkModules () {
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

        this.master.lineOut(this.analyser);
    }

    noteOn () {
        let m,
            dest;

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
            if (m && typeof m.noteOn === 'function') {
                m.noteOn();
            }
        });
    }

    noteOff () {
        let release = 0,
            adsr = (this.modules.adsr) ? this.modules.adsr.instance : null,
            m,
            dest;

        if (adsr) {
            release = adsr.getReleaseTime();
        }

        Object.keys(this.modules).forEach((e) => {
            m = this.modules[e].instance;
            if (m && typeof m.resetEnvelope === 'function') {
                dest = (this.modules[m.link]) ? this.modules[m.link].instance : null;
                m.resetEnvelope(dest);
            }
        });
        Object.keys(this.modules).forEach((e) => {
            m = this.modules[e].instance;
            if (m && typeof m.noteOff === 'function') {
                m.noteOff(release);
            }
        });
    }

}

export default Voice;
