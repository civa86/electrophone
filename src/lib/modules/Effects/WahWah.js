import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class WahWah extends Effect {

    constructor (props) {
        super(props);

        let properties = props || {};

        this.automode = +properties.automode || false;      //true/false
        this.baseFrequency = +properties.baseFrequency || 0;            //0 to 1
        this.excursionOctaves = +properties.excursionOctaves || 1;           //1 to 6
        this.sweep = +properties.sweep || 0;                          //0 to 1
        this.resonance = +properties.resonance || 1;                //1 to 100
        this.sensitivity = +properties.sensitivity || 0;              //-1 to 1
        this.bypass = +properties.bypass || 0;

        this.setMainEffect('WahWah', 'filterBp', {
            automode:         this.automode,
            baseFrequency:    this.baseFrequency,
            excursionOctaves: this.excursionOctaves,
            sweep:            this.sweep,
            resonance:        this.resonance,
            sensitivity:      this.sensitivity,
            bypass:           this.bypass
        });
    }
}

export default WahWah;
