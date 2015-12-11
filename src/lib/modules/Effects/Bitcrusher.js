import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class Bitcrusher extends Effect {

    constructor (props) {
        super(props);

        this.setMainEffect('Bitcrusher', 'output');
        this.setMainProperties({
            bits: this.bits,
            normfreq: this.normfreq,
            bufferSize: this.bufferSize
        });
    }

    getProperties () {
        return {
            bits: {
                type: 'number',
                bounds: [1, 16],
                defaultValue: 1
            },
            normfreq: {
                type: 'number',
                bounds: [0, 1],
                defaultValue: 0.5
            },
            bufferSize: {
                type: 'number',
                bounds: [256, 16384],
                defaultValue: 4096
            }
        };
    }
}

export default Bitcrusher;
