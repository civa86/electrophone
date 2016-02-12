'use strict';

import AudioContext from '../../AudioContext';
import SoundSource from '../../core/SoundSource';

class Oscillator extends SoundSource {

    constructor (props, name) {
        super(props, name);
        //TODO separate in a method to call on update...like setMainProperties of Effect!!
        this.main = AudioContext.createOscillator();
        this.main.type = this.wave;
        this.main.connect(this.envelope);

        this.setDetune();
    }

    setNote (note) {
        this.main.frequency.value = note;
    }
}

export default Oscillator;
