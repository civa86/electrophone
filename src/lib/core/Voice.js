import AudioContext from '../AudioContext'
import * as Modules from '../modules'
import SoundSource from './SoundSource'
import { CONST, TYPES } from './Constants'

class Voice {

    constructor (note, modulesConfig) {
        this.note = note;
        this.modulesConfig = modulesConfig;
        this.modules = {};
        this.soundSources = [];
        this.master = null;

        this.setupModules();
        this.linkModules();
    }

    setupModules () {
        let modConf,
            m;

        Object.keys(this.modulesConfig).forEach((mod) => {
            modConf = this.modulesConfig[mod];
            if (modConf.type && modConf.props) {
                m = new Modules[modConf.type](modConf.props);
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
                    dest = destinationModule.instance.getLineIn(currentModuleType);
                    source.connect(dest);
                }
            }
        });

        this.master.lineOut();
    }

    noteOn () {
        let m;
        Object.keys(this.modules).forEach((e) => {
            m = this.modules[e].instance;
            if (typeof m.setEnvelope === 'function') {
                m.setEnvelope();
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
        let release = this.master.releaseEnvelope(),
            m;

        Object.keys(this.modules).forEach((e) => {
            m = this.modules[e].instance;
            if (typeof m.resetEnvelope === 'function') {
                m.resetEnvelope();
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
