'use strict';

import Effect from '../../core/Effect';

class Filter extends Effect {

    constructor (audioContext, props, name) {
        super(audioContext, props, name);

        this.setMainEffect('Filter', 'filter');
        this.setMainProperties({
            frequency: this.freq,
            Q: this.q,
            gain: this.filterGain,
            filterType: this.filterType,
            bypass: this.bypass
        });
    }
}

export default Filter;
