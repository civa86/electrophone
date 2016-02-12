'use strict';

import Effect from '../../core/Effect';

class Tremolo extends Effect {

    constructor (props, name) {
        super(props, name);

        this.setMainEffect('Tremolo', 'output');
        this.setMainProperties({
            intensity: this.intensity,
            rate: this.rate,
            stereoPhase: this.stereoPhase,
            bypass: this.bypass
        });
    }
}

export default Tremolo;
