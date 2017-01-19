export default {
    createGainNode: () => ({
        gain: {
            value: 0
        },
        connect: () => null
    }),
    createDelayNode: () => ({}),
    createScriptProcessor: () => ({
        connect: () => null
    }),
    createAnalyser: () => ({
        smoothingTimeConstant: '',
        fftSize: '',
        minDecibels: 0,
        maxDecibels: 0,
        connect: () => null,
        getByteFrequencyData: () => null
    }),
    createGain: () => ({
        gain: {
            value: 0
        },
        connect: () => null
    }),
    createOscillator: () => ({
        type: '',
        connect: () => null
    }),
    destination: {}
};
