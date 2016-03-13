'use strict';

import Effect from '../../core/Effect';

class Delay extends Effect {

    constructor (props, name) {
        super(props, name);

        this.setMainEffect('Delay', 'filter');
        this.setMainProperties({
            dryLevel: this.dry,
            wetLevel: this.wet,
            feedback: this.feedback,
            cutoff: this.cutoff,
            delayTime: this.delayTime,
            bypass: this.bypass
        });
    }
}

export default Delay;
