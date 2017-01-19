'use strict';

import { CONST } from '../core/Constants';

const ModulatorProps = {
    freq: {
        type: 'number',
        bounds: [1, 100],
        defaultValue: 5
    },
    target: {
        type: 'string',
        bounds: [
            CONST.MODULATOR_TARGET_FREQ,
            CONST.MODULATOR_TARGET_DETUNE
        ],
        defaultValue: CONST.MODULATOR_TARGET_FREQ
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

export default ModulatorProps;
