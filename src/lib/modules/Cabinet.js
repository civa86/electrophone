import { CONST } from '../core/Constants'
import Effect from '../core/Effect'

class Cabinet extends Effect {

    constructor (props) {
        super(props);

        let properties = props || {};
        this.makeupGain = +properties.makeupGain || 1;     //0 to 20
        this.impulsePath = properties.impulsePath || '';  //path to your speaker impulse
        this.bypass = +properties.bypass || 0;

        this.setMainEffect('Cabinet', 'output', {
            makeupGain: this.makeupGain,
            impulsePath: this.impulsePath,
            bypass: this.bypass
        });
    }
}

export default Cabinet;
