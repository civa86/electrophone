'use strict';

import { TYPES } from '../core/Constants';
import Module from '../core/Module';

class SoundSource extends Module {

    constructor (audioContext, props, name) {
        super(audioContext, props, name);

        this.defaultLineInProperty = 'frequency';
    }

    setDetune () {
        if (this.main && this.main.detune) {
            this.main.detune.value = this.detune;
        }
    }

    noteOn () {
        this.main.start(0);
    }

    noteOff (release) {
        this.main.stop(release);
    }

    getLineIn (sourceType, source) {
        if (sourceType === TYPES.MODULATOR) {
            return this.main[source.target];
        } else {
            return this.main[this.defaultLineInProperty];
        }
    }
}

export default SoundSource;
