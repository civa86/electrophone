import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class Filter extends Effect {

    constructor (props) {
        super(props);

        this.setMainEffect('Filter', 'filter');
        this.setMainProperties({
            frequency: this.freq,
            Q: this.q,
            gain: this.filterGain,
            filterType: this.filterType,
            bypass: this.bypass
        });
    }

    getProperties () {
        return {
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
    }
}

export default Filter;
