import AudioContext from './AudioContext'
import { CONST } from './Constants'
import Voice from './Voice'

class Synth {

    constructor () {
        this.modules = {};
        this.voices = {};

        this.module('Master', CONST.MASTER, {
            level: 1,
            envelope: {
                attack:  1,
                decay:   50,
                sustain: 100,
                release: 10
            }
        });
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

        if (!this.modules[label]) {
            this.addModule(type, label, props);
        }
    }

    addModule (type, label, props) {
        this.modules[label] = {
            type,
            props
        };
    }

    play (note) {
        if (!this.voices[note]) {
            this.voices[note] = new Voice(note, this.modules);
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
