import AudioContext from '../AudioContext'
import * as Modules from '../modules'
import SoundSource from './SoundSource'
import { CONST, TYPES } from './Constants'

class Voice {

    constructor (note, modules) {
        this.note = note;
        this.modules = modules;
        this.soundSources = [];
        this.master = null;

        this.setupModules();
        this.linkModules();
    }

    setupModules () {
        let m;

        for (let mod of Object.keys(this.modules)) {
            m = this.modules[mod];
            if (m.type && m.props) {
                m.instance = new Modules[m.type](m.props);
                if (m.instance instanceof SoundSource) {
                    this.soundSources.push(m.instance);
                } else if (m.type === TYPES.MASTER) {
                    this.master = m.instance;
                }
            }
        }
    }

    linkModules () {
        for (let mod of Object.keys(this.modules)) {
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
        }

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
