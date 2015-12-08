import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class MoogFilter extends Effect {

    constructor (props) {
        super(props);

        let properties = props || {};

        this.cutoff = +properties.cutoff || 0.2;      //0 to 1
        this.resonance = +properties.resonance || 1;      //0 to 4
        this.bufferSize = +properties.bufferSize || 4096;  //256 to 16384

        this.setMainEffect('MoogFilter', 'output', {
            cutoff:     this.cutoff,
            resonance:  this.resonance,
            bufferSize: this.bufferSize
        });
    }
}

export default MoogFilter;
