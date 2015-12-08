import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class Bitcrusher extends Effect {

    constructor (props) {
        super(props);

        let properties = props || {};

        this.bits = +properties.bits || 4;                  //1 to 16
        this.normfreq =  +properties.normfreq || 0.1;       //0 to 1
        this.bufferSize = +properties.bufferSize || 4096;  //256 to 16384

        this.setMainEffect('Bitcrusher', 'output', {
            bits: this.bits,
            normfreq: this.normfreq,
            bufferSize: this.bufferSize
        });
    }
}

export default Bitcrusher;
