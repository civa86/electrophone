import { CONST } from '../core/Constants'

const FilterProps = {
    freq: {
        type: 'number',
        bounds: [20, 20000],
        defaultValue: 440
    },
    q: {
        type: 'number',
        bounds: [0.001, 100],
        defaultValue: 10
    },
    filterGain: {
        type: 'number',
        bounds: [-40, 40],
        defaultValue: 0
    },
    filterType: {
        type: 'string',
        defaultValue: CONST.FILTER_LOWPASS
    },
    bypass: {
        type: 'number',
        bounds: [0, 1],
        defaultValue: 0
    }
};

export default FilterProps;
