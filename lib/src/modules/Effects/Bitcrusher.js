'use strict';

import Effect from '../../core/Effect';

class Bitcrusher extends Effect {

    constructor (audioContext, props, name) {
        super(audioContext, props, name);

        this.setMainEffect('Bitcrusher', 'output');
        this.setMainProperties({
            bits: this.bits,
            normfreq: this.normfreq,
            bufferSize: this.bufferSize
        });
    }

}

export default Bitcrusher;
