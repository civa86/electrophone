import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class Cabinet extends Effect {

    constructor (props) {
        super(props);

        this.setMainEffect('Cabinet', 'output', {
            impulsePath: this.impulsePath,
            makeupGain: 1
        });
        this.setMainProperties({
            impulsePath: this.impulsePath,
            makeupGain: this.makeupGain,
            bypass: this.bypass
        });
    }

    getProperties () {
        return {
            makeupGain: {
                type: 'number',
                bounds: [0, 20],
                defaultValue: 0
            },
            impulsePath: {
                type: 'string',
                defaultValue: ''
            },
            bypass: {
                type: 'number',
                bounds: [0, 1],
                defaultValue: 0
            }
        };
    }
}

export default Cabinet;
