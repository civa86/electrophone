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
                destinationModule,
                source,
                dest;

            if (currentModule.link) {
                destinationModule = this.modules[currentModule.link];
                if (destinationModule && destinationModule.instance) {
                    source = currentModule.getLineOut();
                    dest = destinationModule.instance.getLineIn();
                    source.connect(dest);
                }
            }
        }

        this.master.lineOut();
    }

    noteOn () {
        this.master.setEnvelope();

        for (let source of this.soundSources) {
            source.setNote(this.note);
            source.noteOn();
        }
    }

    noteOff () {
        let release = this.master.releaseEnvelope();

        for (let source of this.soundSources) {
            source.noteOff(release);
        }
    }

}

export default Voice;
