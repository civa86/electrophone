'use strict';

const DefaultProps = {
    link: {
        type: 'string',
        defaultValue: ''
    },
    level: {
        type: 'number',
        bounds: [0, 100],
        defaultValue: 100
    }
};

export default DefaultProps;
