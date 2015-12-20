import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class Overdrive extends Effect {

    constructor (props, name) {
        super(props, name);

        this.setMainEffect('Overdrive', 'output');
        this.setMainProperties({
            outputGain: this.outputGain,
            drive: this.drive,
            curveAmount: this.curveAmount,
            algorithmIndex: this.algorithmIndex,
            bypass: this.bypass
        });
    }
}

export default Overdrive;
