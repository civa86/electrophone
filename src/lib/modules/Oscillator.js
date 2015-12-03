import AudioContext from '../AudioContext'
import SoundSource from '../core/SoundSource'

class Oscillator extends SoundSource {

    constructor (props) {
        super(props);

        this.osc = AudioContext.createOscillator();
        this.osc.type = props.type || 'sine';
        this.osc.detune.value = props.detune || 0;
        this.osc.connect(this.gain);

        this.lineout = {
            source: this.gain,
            dest:   props.link
        };
    }

    setNote (note) {
        this.osc.frequency.value = note;
    }

    noteOn () {
        this.osc.start(0);
    }

    noteOff (release) {
        this.osc.stop(release);
    }
}

export default Oscillator;
