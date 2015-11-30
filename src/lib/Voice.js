import AudioContext from './AudioContext'
import * as Modules from './modules'

class Voice {

    constructor (note, modules) {
        this.note = note;
        this.modules = modules;
        this.soundSources = [];
        this.lineout = AudioContext.createGain();
        this.lineout.gain.value = 1;

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
            } else {
                source.connect(this.lineout);
                this.lineout.connect(AudioContext.destination);
            }
        }
    }

    noteOn () {
        let currentEnvA = 2,
            currentEnvD = 15,
            currentEnvS = 0,
            currentEnvR = 5,
            now = AudioContext.currentTime,
            envAttackEnd = now + (currentEnvA / 20.0),
            master = this.modules.master.instance;

        master.setEnvelope(now, envAttackEnd, currentEnvS, currentEnvD);
        for (let source of this.soundSources) {
            source.setNote(this.note);
            source.noteOn();
        }
    }

    noteOff () {
        let currentEnvA = 2,
            currentEnvD = 15,
            currentEnvS = 0,
            currentEnvR = 5,
            now = AudioContext.currentTime,
            envAttackEnd = now + (currentEnvA / 20.0),
            release = now + (currentEnvR / 10.0),
            master = this.modules.master.instance;

        master.resetEnvelope(now, currentEnvR);
        for (let source of this.soundSources) {
            source.noteOff(release);
        }
    }

}

export default Voice;
