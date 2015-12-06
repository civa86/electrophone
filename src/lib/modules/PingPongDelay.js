import { CONST } from '../core/Constants'
import Effect from '../core/Effect'

class PingPongDelay extends Effect {

    constructor (props) {
        super(props);

        this.wet = +props.wet || 0;
        this.feedback = +props.feedback || 0;
        this.delayTimeLeft = +props.delayTimeLeft || 0;
        this.delayTimeRight = +props.delayTimeRight || 0;
        this.bypass = +props.bypass || 0;

        //TODO set an array of main effects??
        this.setMainEffect('PingPongDelay', 'delayLeft', {
            wetLevel: this.wet, //0 to 1
            feedback: this.feedback, //0 to 1
            delayTimeLeft: this.delayTimeRight, //1 to 10000 (milliseconds)
            delayTimeRight: this.delayTimeRight //1 to 10000 (milliseconds)
        });
    }
}

export default PingPongDelay;
