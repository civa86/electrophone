import { CONST } from '../core/Constants'
import Effect from '../core/Effect'

class Tremolo extends Effect {

    constructor (props) {
        super(props);

        this.intensity = +props.intensity || 0;    //0 to 1
        this.rate = +props.rate || 0.001;         //0.001 to 8
        this.stereoPhase = +props.stereoPhase || 0;    //0 to 180
        this.bypass = +props.bypass || 0;

        //TODO set an array of main effects??
        this.setMainEffect('Tremolo', 'output', {
            intensity: this.intensity,
            rate: this.rate,
            stereoPhase: this.stereoPhase,
            bypass: this.bypass
        });
        console.log(this.main);
    }
}

export default Tremolo;
