'use strict';

const BitcrusherProps = {
    bits: {
        type: 'number',
        bounds: [1, 16],
        defaultValue: 1
    },
    normfreq: {
        type: 'number',
        bounds: [0, 1],
        defaultValue: 0.5
    },
    bufferSize: {
        type: 'number',
        bounds: [256, 16384],
        defaultValue: 4096
    }
};

export default BitcrusherProps;
