import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class Overdrive extends Effect {

    constructor (props) {
        super(props);

        this.setMainEffect('Overdrive', 'output');
        this.setMainProperties({
            outputGain: this.outputGain,
            drive: this.drive,
            curveAmount: this.curveAmount,
            algorithmIndex: this.algorithmIndex,
            bypass: this.bypass
        });
    }

    getProperties () {
        return {
            outputGain: {
                type: 'number',
                bounds: [0, 1],
                defaultValue: 0.5
            },
            drive: {
                type: 'number',
                bounds: [0, 1],
                defaultValue: 0
            },
            curveAmount: {
                type: 'number',
                bounds: [0, 1],
                defaultValue: 1
            },
            algorithmIndex: {
                type: 'number',
                bounds: [0, 5],
                defaultValue: 0
            },
            bypass: {
                type: 'number',
                bounds: [0, 1],
                defaultValue: 0
            }
        };
    }
}

export default Overdrive;
