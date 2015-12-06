import { CONST, TYPES } from '../core/Constants'
import AudioContext from '../AudioContext'
import Module from '../core/Module'
import Effect from '../core/Effect'

class Filter extends Effect {

    constructor (props) {
        super(props);

        this.freq = +props.freq || 11000;
        this.q = +props.q || 10;
        this.bypass = +props.bypass || 0;
        this.filterGain = this.level || 0;

        this.setMainEffect('Filter', 'filter', {
            frequency: this.freq, //20 to 22050
            Q: this.q, //0.001 to 100
            gain: this.filterGain, //-40 to 40
            filterType: props.type || CONST.FILTER_LOWPASS,
            bypass: this.bypass
        });
    }
}

export default Filter;
