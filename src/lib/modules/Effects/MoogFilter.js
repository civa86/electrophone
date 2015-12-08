import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class MoogFilter extends Effect {

    constructor (props) {
        super(props);

        this.setMainEffect('MoogFilter', 'output', {
            cutoff:     this.cutoff,
            resonance:  this.resonance,
            bufferSize: this.bufferSize
        });
    }

    getProperties () {
        return {
            cutoff: {
                type: 'number',
                bounds: [0, 1],
                defaultValue: 0
            },
            resonance: {
                type: 'number',
                bounds: [0, 4],
                defaultValue: 0
            },
            bufferSize: {
                type: 'number',
                bounds: [256, 16384],
                defaultValue: 4096
            }
        };
    }
}

export default MoogFilter;
