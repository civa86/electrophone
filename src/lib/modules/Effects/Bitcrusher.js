import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class Bitcrusher extends Effect {

    constructor (props, name) {
        super(props, name);

        this.setMainEffect('Bitcrusher', 'output');
        this.setMainProperties({
            bits: this.bits,
            normfreq: this.normfreq,
            bufferSize: this.bufferSize
        });
    }

}

export default Bitcrusher;
