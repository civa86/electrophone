import { CONST, TYPES } from '../core/Constants'
import AudioContext from '../AudioContext'
import SoundSource from '../core/SoundSource'

class Oscillator extends SoundSource {

    constructor (props) {
        super(props);

        this.detune = +props.detune || 0;

        this.main = AudioContext.createOscillator();
        this.main.type = props.type || CONST.WAVE_SINE;
        this.main.connect(this.gain);

        this.setDetune();
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

    getLineIn (sourceType, source) {
        if (sourceType === TYPES.MODULATOR) {
            return this.main[source.target];
        } else {
            return this.main.frequency;
        }
    }
}

export default Oscillator;
