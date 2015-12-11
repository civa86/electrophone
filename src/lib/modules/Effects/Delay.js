import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class Delay extends Effect {

    constructor (props) {
        super(props);

        this.setMainEffect('Delay', 'filter');
        this.setMainProperties({
            dryLevel: this.dry,
            wetLevel: this.wet,
            feedback: this.feedback,
            cutoff: this.cutoff,
            delayTime: this.delayTime,
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
            cutoff: {
                type: 'number',
                bounds: [20, 20000],
                defaultValue: 440
            },
            delayTime: {
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

export default Delay;
