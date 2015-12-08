import { CONST } from '../core/Constants'
import Effect from '../core/Effect'

class Overdrive extends Effect {

    constructor (props) {
        super(props);

        let properties = props || {};
        this.outputGain = +properties.outputGain || 0.5;     //0 to 1+
        this.drive = +properties.drive || 0.7;              //0 to 1
        this.curveAmount = +properties.curveAmount || 1;    //0 to 1
        this.algorithmIndex = +properties.algorithmIndex || 0;  //0 to 5, selects one of our drive algorithms
        this.bypass = +properties.bypass || 0;

        this.setMainEffect('Overdrive', 'output', {
            outputGain: this.outputGain,
            drive: this.drive,
            curveAmount: this.curveAmount,
            algorithmIndex: this.algorithmIndex,
            bypass: this.bypass
        });
    }
}

export default Overdrive;
