'use strict';

import Effect from '../../core/Effect';

class WahWah extends Effect {

    constructor (audioContext, props, name) {
        super(audioContext, props, name);

        this.setMainEffect('WahWah', 'filterBp');
        this.setMainProperties({
            automode: (this.automode > 0) ? true : false,
            baseFrequency: this.baseFrequency,
            excursionOctaves: this.excursionOctaves,
            sweep: this.sweep,
            resonance: this.resonance,
            sensitivity: this.sensitivity,
            bypass: this.bypass
        });
    }
}

export default WahWah;
