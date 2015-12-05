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
        this.main.connect(this.gain);

        this.setCutOff();
        this.setQ();
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
            return this.main.frequency;
        } else {
            return this.main;
        }
    }
}

export default Filter;
