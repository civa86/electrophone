import { CONST } from '../core/Constants'
import Effect from '../core/Effect'

class WahWah extends Effect {

    constructor (props) {
        super(props);

        this.automode = +props.automode || false;      //true/false
        this.baseFrequency = +props.baseFrequency || 0;            //0 to 1
        this.excursionOctaves = +props.excursionOctaves || 1;           //1 to 6
        this.sweep = +props.sweep || 0;                          //0 to 1
        this.resonance = +props.resonance || 1;                //1 to 100
        this.sensitivity = +props.sensitivity || 0;              //-1 to 1
        this.bypass = +props.bypass || 0;

        //TODO set an array of main effects??
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
