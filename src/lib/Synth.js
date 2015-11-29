import AudioContext from './AudioContext'
import Voice from './Voice'

class Synth {

    constructor () {
        this.master = AudioContext.createGain();
        this.master.connect(AudioContext.destination);
        this.modules = {};
        this.voices = {};
    }

    module (type, label, props) {
        if (!type || type.constructor !== String) {
            throw new Error('Synth Module :: missing type');
        }

        if (!label || label.constructor !== String) {
            throw new Error('Synth Module :: missing label');
        }

        if (!props || props.constructor !== Object) {
            throw new Error('Synth Module :: missing properties');
        }

        this.modules[label] = {
            type,
            props
        };
    }

    play (note) {
        if (!this.voices[note]) {
            this.voices[note] = new Voice(note, this.modules, this.master);
            this.voices[note].noteOn();
        }
    }

    stop (note) {
        if (this.voices[note]) {
            this.voices[note].noteOff();
            this.voices[note] = undefined;
        }
    }
}

export default Synth;
