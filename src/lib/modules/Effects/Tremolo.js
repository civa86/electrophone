import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class Tremolo extends Effect {

    constructor (props) {
        super(props);

        let properties = props || {};

        this.intensity = +properties.intensity || 0;    //0 to 1
        this.rate = +properties.rate || 0.001;         //0.001 to 8
        this.stereoPhase = +properties.stereoPhase || 0;    //0 to 180
        this.bypass = +properties.bypass || 0;

        this.setMainEffect('Tremolo', 'output', {
            intensity: this.intensity,
            rate: this.rate,
            stereoPhase: this.stereoPhase,
            bypass: this.bypass
        });
    }
}

export default Tremolo;
