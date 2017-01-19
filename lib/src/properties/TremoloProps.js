'use strict';

const TremoloProps = {
    intensity: {
        type: 'number',
        bounds: [0, 1],
        step: 0.1,
        defaultValue: 0.3
    },
    rate: {
        type: 'number',
        bounds: [0, 11],
        step: 0.1,
        defaultValue: 5,
    },
    stereoPhase: {
        type: 'number',
        bounds: [0, 180],
        defaultValue: 0
    },
    bypass: {
        type: 'number',
        bounds: [0, 1],
        defaultValue: 0
    }
};

export default TremoloProps;
