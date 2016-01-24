'use strict';

import { CONST } from '../core/Constants';

const NoiseProps = {
    color: {
        type: 'string',
        bounds: [
            CONST.NOISE_BROWN,
            CONST.NOISE_PINK,
            CONST.NOISE_WHITE
        ],
        defaultValue: CONST.NOISE_WHITE
    },
    detune: {
        type: 'number',
        bounds: [-1200, 1200],
        defaultValue: 0
    }
};

export default NoiseProps;
