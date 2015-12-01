import * as Modules from './modules'

let moduleTypes = {},
    methods = Object.keys(Modules),
    key;

for (let type of methods) {
    key = type.toUpperCase();
    moduleTypes[key] = type;
}

export const TYPES = moduleTypes;
export const CONST = {
    MASTER: 'master',

    NOISE_WHITE: 'white',
    NOISE_PINK:  'pink',
    NOISE_BROWN: 'brown',

    WAVE_SINE:   'sine',
    WAVE_SQUARE: 'square'
};
