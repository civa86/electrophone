import AudioContext from './AudioContext'
import * as Modules from './modules'

class Voice {

    constructor (note, modules) {
        this.note = note;
        this.modules = modules;
        this.soundSources = [];

        this.setupModules();
        this.linkModules();
    }

    setupModules () {
        let m;

        for (let mod of Object.keys(this.modules)) {
            m = this.modules[mod];
            if (m.type && m.props) {
                m.instance = new Modules[m.type](m.props);
                if (m.type === 'Oscillator') {
                    this.soundSources.push(m.instance);
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
            } else if (mod === 'master') {
                source.connect(instance.gain);
                instance.gain.connect(AudioContext.destination);
            }
        }
    }

    noteOn () {
        let master = this.modules.master.instance;
        master.setEnvelope();

        for (let source of this.soundSources) {
            source.setNote(this.note);
            source.noteOn();
        }
    }

    noteOff () {
        let master = this.modules.master.instance,
            release = AudioContext.currentTime + (master.env.release / 10.0);

        master.resetEnvelope();

        for (let source of this.soundSources) {
            source.noteOff(release);
        }
    }

}

export default Voice;
