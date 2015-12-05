import { CONST } from '../core/Constants'
import AudioContext from '../AudioContext'
import SoundSource from '../core/SoundSource'

class Modulator extends SoundSource {

    constructor (props) {
        super(props);

        this.freq = +props.freq || 440;

        this.main = AudioContext.createOscillator();
        this.main.type = props.type || CONST.WAVE_SINE;
        this.main.connect(this.gain);
    }

    setNote () {
        let f =  this.freq % 11;
        this.main.frequency.value = f;
    }

    getLineIn () {
        return this.main.frequency;
    }
}

export default Modulator;
