'use strict';

import Effect from '../../core/Effect';

class MoogFilter extends Effect {

    constructor (audioContext, props, name) {
        super(audioContext, props, name);

        this.setMainEffect('MoogFilter', 'output');
        this.setMainProperties({
            cutoff: this.cutoff,
            resonance: this.resonance,
            bufferSize: this.bufferSize
        });
    }
}

export default MoogFilter;
