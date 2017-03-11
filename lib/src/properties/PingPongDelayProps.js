'use strict';

const PingPongDelayProps = {
    wet: {
        type: 'number',
        bounds: [0, 1],
        step: 0.1,
        defaultValue: 0.5
    },
    feedback: {
        type: 'number',
        bounds: [0, 1],
        step: 0.1,
        defaultValue: 0.3
    },
    delayTimeLeft: {
        type: 'number',
        bounds: [1, 10000],
        defaultValue: 200
    },
    delayTimeRight: {
        type: 'number',
        bounds: [1, 10000],
        defaultValue: 400
    },
    bypass: {
        type: 'number',
        bounds: [0, 1],
        defaultValue: 0
    }
};

export default PingPongDelayProps;
