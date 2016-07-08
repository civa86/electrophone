'use strict';

const WahWahProps = {
    automode: {
        type: 'number',
        bounds: [0, 1],
        defaultValue: 1
    },
    baseFrequency: {
        type: 'number',
        bounds: [0, 1],
        step: 0.1,
        defaultValue: 0
    },
    excursionOctaves: {
        type: 'number',
        bounds: [1, 6],
        defaultValue: 1
    },
    sweep: {
        type: 'number',
        bounds: [0, 1],
        defaultValue: 0
    },
    resonance: {
        type: 'number',
        bounds: [1, 100],
        defaultValue: 1
    },
    sensitivity: {
        type: 'number',
        bounds: [-1, 1],
        defaultValue: 0
    },
    bypass: {
        type: 'number',
        bounds: [0, 1],
        defaultValue: 0
    }
};

export default WahWahProps;
