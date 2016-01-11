'use strict';

import AudioContext from '../AudioContext';
import Module from '../core/Module';

class Pan extends Module {

    constructor (props, name) {
        super(props, name);
        //TODO check for method to call on update...like setMainProperties of Effect!!
        this.main = AudioContext.createStereoPanner();
        this.main.pan.value = this.value;
        this.main.connect(this.envelope);
    }
}

export default Pan;
