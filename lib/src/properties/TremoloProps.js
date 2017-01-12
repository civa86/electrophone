'use strict';

const TremoloProps = {
    intensity: {
        type: 'number',
        bounds: [0, 1],
        step: 0.1,
        defaultValue: 0
    },
    rate: {
        type: 'number',
        bounds: [0, 8],
        defaultValue: 0
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
