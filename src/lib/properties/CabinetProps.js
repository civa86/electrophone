const CabinetProps = {
    makeupGain: {
        type: 'number',
        bounds: [0, 20],
        defaultValue: 0
    },
    impulsePath: {
        type: 'string',
        defaultValue: ''
    },
    bypass: {
        type: 'number',
        bounds: [0, 1],
        defaultValue: 0
    }
};

export default CabinetProps;
