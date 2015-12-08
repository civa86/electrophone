import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class Delay extends Effect {

    constructor (props) {
        super(props);

        let properties = props || {};

        this.wet = +properties.wet || 0;
        this.feedback = +properties.feedback || 0;
        this.cutoff = +properties.cutoff || 0;
        this.delayTime = +properties.delayTime || 0;
        this.bypass = +properties.bypass || 0;

        this.setMainEffect('Delay', 'filter', {
            feedback: this.feedback,    //0 to 1+
            delayTime: this.delayTime,    //how many milliseconds should the wet signal be delayed?
            wetLevel: this.wet,    //0 to 1+
            dryLevel: 1,       //0 to 1+
            cutoff: this.cutoff,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
            bypass: this.bypass
        });
    }
}

export default Delay;
