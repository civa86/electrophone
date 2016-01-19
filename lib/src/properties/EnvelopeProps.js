'use strict';

const EnvelopeProps = {
    target: {
        type: 'string',
        defaultValue: null
    },
    attack: {
        type: 'number',
        bounds: [1, 100],
        defaultValue: 1
    },
    decay: {
        type: 'number',
        bounds: [1, 100],
        defaultValue: 1
    },
    sustain: {
        type: 'number',
        bounds: [1, 100],
        defaultValue: 100
    },
    release: {
        type: 'number',
        bounds: [1, 100],
        defaultValue: 5
    }
};

export default EnvelopeProps;
