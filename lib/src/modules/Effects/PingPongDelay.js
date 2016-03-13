'use strict';

import Effect from '../../core/Effect';

class PingPongDelay extends Effect {

    constructor (props, name) {
        super(props, name);

        this.setMainEffect('PingPongDelay', 'delayLeft');
        this.setMainProperties({
            dryLevel: this.dry,
            wetLevel: this.wet,
            feedback: this.feedback,
            delayTimeLeft: this.delayTimeLeft,
            delayTimeRight: this.delayTimeRight,
            bypass: this.bypass
        });
    }
}

export default PingPongDelay;
