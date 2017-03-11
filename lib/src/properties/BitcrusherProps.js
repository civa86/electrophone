'use strict';

const BitcrusherProps = {
    bits: {
        type: 'number',
        bounds: [1, 16],
        defaultValue: 4
    },
    normfreq: {
        type: 'number',
        bounds: [0, 1],
        step: 0.1,
        defaultValue: 0.1
    },
    bufferSize: {
        type: 'number',
        bounds: [256, 16384],
        defaultValue: 4096
    },
    bypass: {
        type: 'number',
        bounds: [0, 1],
        defaultValue: 0
    }
};

export default BitcrusherProps;
