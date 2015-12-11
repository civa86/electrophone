import { CONST } from '../../core/Constants'
import Effect from '../../core/Effect'

class WahWah extends Effect {

    constructor (props) {
        super(props);

        this.setMainEffect('WahWah', 'filterBp');
        this.setMainProperties({
            automode:         this.automode,
            baseFrequency:    this.baseFrequency,
            excursionOctaves: this.excursionOctaves,
            sweep:            this.sweep,
            resonance:        this.resonance,
            sensitivity:      this.sensitivity,
            bypass:           this.bypass
        });
    }

    getProperties () {
        return {
            automode: {
                type: 'boolean',
                defaultValue: false
            },
            baseFrequency: {
                type: 'number',
                bounds: [0, 1],
                defaultValue: 0
            },
            excursionOctaves: {
                type: 'number',
                bounds: [1, 6],
                defaultValue: 1
            },
            sweep: {
                type: 'number',
                bounds: [0, 1],
                defaultValue: 0
            },
            resonance: {
                type: 'number',
                bounds: [1, 100],
                defaultValue: 1
            },
            sensitivity: {
                type: 'number',
                bounds: [-1, 1],
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

export default WahWah;
