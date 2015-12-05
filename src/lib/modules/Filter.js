import { CONST, TYPES } from '../core/Constants'
import AudioContext from '../AudioContext'
import Module from '../core/Module'

class Filter extends Module {

    constructor (props) {
        super(props);

        this.freq = +props.freq || 11000;
        this.q = +props.q || 10;

        this.main = AudioContext.createBiquadFilter();
        this.main.type = props.type || CONST.FILTER_LOWPASS;

        this.setCutOff();
        this.setQ();
    }

    createGain () {
        return false;
    }

    setCutOff () {
        let cutOff = ((this.freq - 20) / (20000 - 20)) * (14.287712379549449 - 0) + 0;
        this.main.frequency.value = Math.pow(2, cutOff);
    }

    setQ () {
        let q = this.q % 21;
        this.main.Q.value = q;
    }

    getLineIn (source) {
        if (source === TYPES.MODULATOR) {
            //TODO let main parameter detune | frequency... configurable
            return this.main.detune;
        } else {
            return this.main;
        }
    }

    getLineOut () {
        return this.main;
    }
}

export default Filter;
