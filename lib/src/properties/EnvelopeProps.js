'use strict';

import { CONST } from '../core/Constants';

const EnvelopeProps = {
    target: {
        type: 'string',
        bounds: [
            CONST.ENVELOPE_TARGET_GAIN,
            CONST.ENVELOPE_TARGET_FREQ,
            CONST.ENVELOPE_TARGET_DETUNE
        ],
        defaultValue: CONST.ENVELOPE_TARGET_GAIN
    },
    attack: {
        type: 'number',
        bounds: [0, 100],
        defaultValue: 0
    },
    decay: {
        type: 'number',
        bounds: [1, 100],
        defaultValue: 1
    },
    sustain: {
        type: 'number',
        bounds: [0, 100],
        defaultValue: 100
    },
    release: {
        type: 'number',
        bounds: [0, 100],
        defaultValue: 5
    }
};

export default EnvelopeProps;
