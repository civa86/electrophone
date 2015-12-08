import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class Cabinet extends Effect {

    constructor (props) {
        super(props);

        this.setMainEffect('Cabinet', 'output', {
            makeupGain: this.makeupGain,
            impulsePath: this.impulsePath,
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
