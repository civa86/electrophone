'use strict';

import { CONST } from '../core/Constants';

const OscillatorProps = {
    detune: {
        type: 'number',
        bounds: [-1200, 1200],
        defaultValue: 0
    },
    wave: {
        type: 'string',
        bounds: [
            CONST.WAVE_SINE,
            CONST.WAVE_SQUARE,
            CONST.WAVE_SAWTOOTH,
            CONST.WAVE_TRIANLGE,
            CONST.WAVE_CUSTOM
        ],
        defaultValue: CONST.WAVE_SINE
    }
};

export default OscillatorProps;
