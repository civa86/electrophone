import AudioContext from './AudioContext'
import * as Modules from './modules'

class Voice {

    constructor (note, modules, master) {
        this.note = note;
        this.modules = modules;
        this.master = master;

        this.soundSources = [];

        this.setupModules();
        this.linkModules();
    }

    setupModules () {
        let m;

        for (let mod of Object.keys(this.modules)) {
            m = this.modules[mod];

            m.instance = new Modules[m.type](m.props);
            if (m.type === 'Oscillator') {
                this.soundSources.push(m.instance);
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
            if (dest === 'master') {
                out = this.master;
            } else if (this.modules[dest]) {
                out = this.modules[dest].instance.lineout.source;
            }

            source.connect(out);
        }
    }

    noteOn () {
        for (let source of this.soundSources) {
            source.setNote(this.note);
            source.noteOn();
        }
    }

    noteOff () {
        for (let source of this.soundSources) {
            source.noteOff();
        }
    }

}

export default Voice;
