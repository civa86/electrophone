import AudioContext from './AudioContext'
import { CONST } from './core/Constants'
import Voice from './core/Voice'

class Synth {

    constructor () {
        this.modules = {};
        this.voices = {};

        //TODO DONT SHARE SAME MASTER!!!!
        this.module('Master', CONST.MASTER, {
            level: 1,
            envelope: {
                attack:  1,
                decay:   10,
                sustain: 100,
                release: 1
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
        //TODO system mute alla notes...we have only one master....master have to be part of a single voice!
        if (this.voices[note]) {
            this.voices[note].noteOff();
            this.voices[note] = undefined;
        }
    }
}

export default Synth;
