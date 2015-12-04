import { CONST } from '../core/Constants'
import AudioContext from '../AudioContext'
import SoundSource from '../core/SoundSource'

class Oscillator extends SoundSource {

    constructor (props) {
        super(props);

        this.freq = props.freq || null;

        this.main = AudioContext.createOscillator();
        this.main.type = props.type || CONST.WAVE_SINE;
        this.main.detune.value = props.detune || 0;
        this.main.connect(this.gain);

        this.link = props.link || null;
    }

    setNote (note) {
        this.main.frequency.value = this.freq || note;
    }

    linkModule (source) {
        source.gain.connect(this.main.frequency);
    }
}

export default Oscillator;
