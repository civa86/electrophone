import { CONST, TYPES } from '../core/Constants'
import AudioContext from '../AudioContext'
import Module from '../core/Module'
import EffectManager from '../core/EffectManager'

class Filter extends Module {

    constructor (props) {
        super(props);

        this.freq = +props.freq || 11000;
        this.q = +props.q || 10;
        this.bypass = +props.bypass || 0;
        this.filterGain = this.level || 0;

        //TODO think about a Effect super class....to cancel gain creation
        this.main = new EffectManager.Filter({
            frequency: this.freq, //20 to 22050
            Q: this.q, //0.001 to 100
            gain: this.filterGain, //-40 to 40
            filterType: props.type || CONST.FILTER_LOWPASS,
            bypass: this.bypass
        });
    }

    createGain () {
        return false;
    }

    getLineIn (source) {
        if (source === TYPES.MODULATOR) {
            //TODO let main parameter detune | frequency... configurable
            return this.main.filter.detune;
        } else {
            return this.main.input;
        }
    }

    getLineOut () {
        return this.main.output;
    }

    getEnvelopeTarget (target) {
        let ret = null;

        if (target === 'gain') {
            ret = this.main.output.gain;
        } else if (this.main && this.main.filter && this.main.filter[target]) {
            ret = this.main.filter[target]
        }

        return ret;
    }
}

export default Filter;
