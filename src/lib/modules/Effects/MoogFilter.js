import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class MoogFilter extends Effect {

    constructor (props, name) {
        super(props, name);

        this.setMainEffect('MoogFilter', 'output');
        this.setMainProperties({
            cutoff:     this.cutoff,
            resonance:  this.resonance,
            bufferSize: this.bufferSize
        });
    }
}

export default MoogFilter;
