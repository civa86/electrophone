'use strict';

import { TYPES } from '../core/Constants';
import Module from '../core/Module';

class SoundSource extends Module {

    constructor (props, name) {
        super(props, name);

        this.defaultLineInProperty = 'frequency';
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
