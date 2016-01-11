'use strict';

const PingPongDelayProps = {
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
    delayTimeLeft: {
        type: 'number',
        bounds: [1, 10000],
        defaultValue: 1
    },
    delayTimeRight: {
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

export default PingPongDelayProps;
