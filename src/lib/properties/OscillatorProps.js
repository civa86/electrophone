import { CONST } from '../core/Constants'

const OscillatorProps = {
    detune: {
        type: 'number',
        bounds: [-1200, 1200],
        defaultValue: 0
    },
    wave: {
        type: 'string',
        defaultValue: CONST.WAVE_SINE
    }
};

export default OscillatorProps;
