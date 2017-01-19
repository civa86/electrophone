'use strict';

const DelayProps = {
    dry: {
        type: 'number',
        bounds: [0, 1],
        step: 0.1,
        defaultValue: 1
    },
    wet: {
        type: 'number',
        bounds: [0, 1],
        step: 0.1,
        defaultValue: 0.5
    },
    feedback: {
        type: 'number',
        bounds: [0, 0.9],
        defaultValue: 0.4
    },
    cutoff: {
        type: 'number',
        bounds: [20, 20000],
        defaultValue: 440
    },
    delayTime: {
        type: 'number',
        bounds: [20, 1000],
        defaultValue: 100
    },
    bypass: {
        type: 'number',
        bounds: [0, 1],
        defaultValue: 0
    }
};

export default DelayProps;
