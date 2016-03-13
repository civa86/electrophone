'use strict';

const TYPES = {
        MASTER: 'Master',
        OSCILLATOR: 'Oscillator',
        MODULATOR: 'Modulator',
        FILTER: 'Filter',
        NOISE: 'Noise',
        REVERB: 'Reverb',
        CHORUS: 'Chorus',
        DELAY: 'Delay',
        ENVELOPE: 'Envelope'
    },
    CONST = {
        MASTER: 'master',
        ADSR: 'adsr',

        NOISE_WHITE: 'white',
        NOISE_PINK: 'pink',
        NOISE_BROWN: 'brown',

        WAVE_SINE: 'sine',
        WAVE_SQUARE: 'square',
        WAVE_SAWTOOTH: 'sawtooth',
        WAVE_TRIANLGE: 'triangle',
        WAVE_CUSTOM: 'custom',

        FILTER_LOWPASS: 'lowpass',
        FILTER_HIGHPASS: 'highpass',
        FILTER_BANDPASS: 'bandpass',
        FILTER_LOWSHELF: 'lowshelf',
        FILTER_HIGHSHELF: 'highshelf',
        FILTER_PEAKING: 'peaking',
        FILTER_NOTCH: 'notch',
        FILTER_ALLPASS: 'allpass',

        MODULATOR_TARGET_FREQ: 'frequency',
        MODULATOR_TARGET_DETUNE: 'detune',

        ENVELOPE_TARGET_GAIN: 'gain',
        ENVELOPE_TARGET_FREQ: 'frequency',
        ENVELOPE_TARGET_DETUNE: 'detune'
    };

export { TYPES, CONST };
