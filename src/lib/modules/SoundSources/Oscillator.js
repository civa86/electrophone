import { CONST, TYPES } from '../../core/Constants'
import AudioContext from '../../AudioContext'
import SoundSource from '../../core/SoundSource'

class Oscillator extends SoundSource {

    constructor (props) {
        super(props);

        this.main = AudioContext.createOscillator();
        this.main.type = this.wave;
        this.main.connect(this.envelope);

        this.setDetune();
    }

    getProperties () {
        return {
            detune: {
                type: 'number',
                bounds: [-1200, 1200],
                defaultValue: 0
            },
            wave: {
                type: 'string',
                defaultValue: CONST.WAVE_SINE
            }
        };
    }

    setDetune () {
        if (this.detune > 1200) {
            this.detune = 1200;
        } else if (this.detune < -1200) {
            this.detune = -1200;
        }

        this.main.detune.value = this.detune;
    }

    setNote (note) {
        this.main.frequency.value = note;
    }
}

export default Oscillator;
