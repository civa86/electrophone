'use strict';

import Effect from '../../core/Effect';

class WahWah extends Effect {

    constructor (props, name) {
        super(props, name);

        this.setMainEffect('WahWah', 'filterBp');
        this.setMainProperties({
            automode:         this.automode,
            baseFrequency:    this.baseFrequency,
            excursionOctaves: this.excursionOctaves,
            sweep:            this.sweep,
            resonance:        this.resonance,
            sensitivity:      this.sensitivity,
            bypass:           this.bypass
        });
    }
}

export default WahWah;
