import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class PingPongDelay extends Effect {

    constructor (props) {
        super(props);

        let properties = props || {};

        this.wet = +properties.wet || 0;
        this.feedback = +properties.feedback || 0;
        this.delayTimeLeft = +properties.delayTimeLeft || 0;
        this.delayTimeRight = +properties.delayTimeRight || 0;
        this.bypass = +properties.bypass || 0;

        this.setMainEffect('PingPongDelay', 'delayLeft', {
            wetLevel: this.wet, //0 to 1
            feedback: this.feedback, //0 to 1
            delayTimeLeft: this.delayTimeRight, //1 to 10000 (milliseconds)
            delayTimeRight: this.delayTimeRight //1 to 10000 (milliseconds)
        });
    }

    //TODO implement get properties method....
}

export default PingPongDelay;
