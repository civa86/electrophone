'use strict';

const MoogFilterProps = {
    cutoff: {
        type: 'number',
        bounds: [0, 1],
        step: 0.1,
        defaultValue: 0.1
    },
    resonance: {
        type: 'number',
        bounds: [0, 4],
        step: 0.1,
        defaultValue: 3.5
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

export default MoogFilterProps;
