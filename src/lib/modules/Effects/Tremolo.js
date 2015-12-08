import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class Tremolo extends Effect {

    constructor (props) {
        super(props);

        this.setMainEffect('Tremolo', 'output', {
            intensity: this.intensity,
            rate: this.rate,
            stereoPhase: this.stereoPhase,
            bypass: this.bypass
        });
    }

    getProperties () {
        return {
            intensity: {
                type: 'number',
                bounds: [0, 1],
                defaultValue: 0
            },
            rate: {
                type: 'number',
                bounds: [0.001, 8],
                defaultValue: 0.001
            },
            stereoPhase: {
                type: 'number',
                bounds: [0, 180],
                defaultValue: 0
            },
            bypass: {
                type: 'number',
                bounds: [0, 1],
                defaultValue: 0
            }
        };
    }
}

export default Tremolo;
