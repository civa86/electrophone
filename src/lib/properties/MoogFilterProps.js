const MoogFilterProps = {
    cutoff: {
        type: 'number',
        bounds: [0, 1],
        defaultValue: 0
    },
    resonance: {
        type: 'number',
        bounds: [0, 4],
        defaultValue: 0
    },
    bufferSize: {
        type: 'number',
        bounds: [256, 16384],
        defaultValue: 4096
    }
};

export default MoogFilterProps;
