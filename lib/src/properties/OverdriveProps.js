'use strict';

const OverdriveProps = {
    outputGain: {
        type: 'number',
        bounds: [0, 1],
        step: 0.1,
        defaultValue: 0.5
    },
    drive: {
        type: 'number',
        bounds: [0, 1],
        step: 0.1,
        defaultValue: 0
    },
    curveAmount: {
        type: 'number',
        bounds: [0, 1],
        step: 0.1,
        defaultValue: 1
    },
    algorithmIndex: {
        type: 'number',
        bounds: [0, 5],
        defaultValue: 0
    },
    bypass: {
        type: 'number',
        bounds: [0, 1],
        defaultValue: 0
    }
};

export default OverdriveProps;
