import { CONST } from '../core/Constants'
import Effect from '../core/Effect'

class Delay extends Effect {

    constructor (props) {
        super(props);

        this.wet = +props.wet || 0;
        this.feedback = +props.feedback || 0;
        this.cutoff = +props.cutoff || 0;
        this.delayTime = +props.delayTime || 0;
        this.bypass = +props.bypass || 0;

        //TODO set an array of main effects??
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
