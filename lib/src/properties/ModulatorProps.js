'use strict';

import { CONST } from '../core/Constants';

const ModulatorProps = {
    freq: {
        type: 'number',
        bounds: [20, 20000],
        defaultValue: 440
    },
    target: {
        type: 'string',
        defaultValue: 'frequency'
    },
    wave: {
        type: 'string',
        defaultValue: CONST.WAVE_SINE
    }
};

export default ModulatorProps;
