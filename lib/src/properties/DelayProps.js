'use strict';

const DelayProps = {
    dry: {
        type: 'number',
        bounds: [0, 1],
        defaultValue: 1
    },
    wet: {
        type: 'number',
        bounds: [0, 1],
        defaultValue: 0
    },
    feedback: {
        type: 'number',
        bounds: [0, 1],
        defaultValue: 0
    },
    cutoff: {
        type: 'number',
        bounds: [20, 20000],
        defaultValue: 440
    },
    delayTime: {
        type: 'number',
        bounds: [1, 10000],
        defaultValue: 1
    },
    bypass: {
        type: 'number',
        bounds: [0, 1],
        defaultValue: 0
    }
};

export default DelayProps;
