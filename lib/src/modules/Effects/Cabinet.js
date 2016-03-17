'use strict';

import Effect from '../../core/Effect';

class Cabinet extends Effect {

    constructor (audioContext, props, name) {
        super(audioContext, props, name);

        this.setMainEffect('Cabinet', 'output', {
            impulsePath: this.impulsePath,
            makeupGain: 1
        });
        this.setMainProperties({
            impulsePath: this.impulsePath,
            makeupGain: this.makeupGain,
            bypass: this.bypass
        });
    }
}

export default Cabinet;
