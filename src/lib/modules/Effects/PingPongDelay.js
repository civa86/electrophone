import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class PingPongDelay extends Effect {

    constructor (props) {
        super(props);

        this.setMainEffect('PingPongDelay', 'delayLeft', {
            dryLevel: this.dry,
            wetLevel: this.wet,
            feedback: this.feedback,
            delayTimeLeft: this.delayTimeLeft,
            delayTimeRight: this.delayTimeRight,
            bypass: this.bypass
        });
    }

    getProperties () {
        return {
            dry: {
                type: 'number',
                bounds: [0, 1],
                defaultValue: 1
            },
            wet: {
                type: 'number',
                bounds: [0, 1],
                defaultValue: 0
            },
            feedback: {
                type: 'number',
                bounds: [0, 1],
                defaultValue: 0
            },
            delayTimeLeft: {
                type: 'number',
                bounds: [1, 10000],
                defaultValue: 1
            },
            delayTimeRight: {
                type: 'number',
                bounds: [1, 10000],
                defaultValue: 1
            },
            bypass: {
                type: 'number',
                bounds: [0, 1],
                defaultValue: 0
            }
        };
    }
}

export default PingPongDelay;
