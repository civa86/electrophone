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
            let instance,
                lineout,
                source,
                dest,
                out;

            instance = this.modules[mod].instance;
            lineout = instance.lineout;
            source = lineout.source;
            dest = lineout.dest;

            source.disconnect();

            if (this.modules[dest]) {
                out = this.modules[dest].instance.lineout.source;
                source.connect(out);
            } else if (mod === CONST.MASTER) {
                source.connect(instance.gain);
                instance.gain.connect(AudioContext.destination);
            }
        }
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
