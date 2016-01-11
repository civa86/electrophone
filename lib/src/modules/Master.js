'use strict';

import AudioContext from '../AudioContext';
import Module from '../core/Module';

class Master extends Module {

    constructor (props, name) {
        super(props, name);
        //TODO check for method to call on update...like setMainProperties of Effect!!
        this.main = AudioContext.createGain();
        this.link = null;
    }

    getLineIn () {
        return this.main;
    }

    lineOut (analyser) {
        this.main.connect(this.envelope);
        if (analyser) {
            this.gain.connect(analyser);
        } else {
            this.gain.connect(AudioContext.destination);
        }
    }
}

export default Master;
