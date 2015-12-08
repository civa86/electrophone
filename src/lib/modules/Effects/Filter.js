import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class Filter extends Effect {

    constructor (props) {
        super(props);

        let properties = props || {};

        this.freq = +properties.freq || 11000;
        this.q = +properties.q || 10;
        this.bypass = +properties.bypass || 0;
        this.filterGain = this.level || 0;

        this.setMainEffect('Filter', 'filter', {
            frequency: this.freq, //20 to 22050
            Q: this.q, //0.001 to 100
            gain: this.filterGain, //-40 to 40
            filterType: properties.type || CONST.FILTER_LOWPASS,
            bypass: this.bypass
        });
    }
}

export default Filter;
