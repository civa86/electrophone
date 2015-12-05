import AudioContext from './AudioContext'
import { CONST } from './core/Constants'
import Voice from './core/Voice'

class Synth {

    constructor () {
        this.modulesConfig = {};
        this.voices = {};

        this.module('Master', CONST.MASTER, {
            level: 100
        });

        //TODO put default value as if no envelope....copy from master commetend fallback cases
        //TODO let update values from props....
        this.module('Envelope', CONST.ADSR, {
            link:    CONST.MASTER,
            target:  'gain',
            level:   100,
            attack:  10,
            decay:   1,
            sustain: 100,
            release: 10
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

        if (!this.modulesConfig[label]) {
            this.addModule(type, label, props);
        }
    }

    addModule (type, label, props) {
        this.modulesConfig[label] = {
            type,
            props
        };
    }

    play (note) {
        if (!this.voices[note]) {
            this.voices[note] = new Voice(note, this.modulesConfig);
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
