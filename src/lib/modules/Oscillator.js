//Web Audio Context
import AudioContext from '../AudioContext'

class Oscillator {

    constructor (props) {
        this.osc = AudioContext.createOscillator();
        this.gain = AudioContext.createGain();

        this.osc.type = props.type || 'sine';
        this.osc.frequency.value = props.frequency || 440;
        this.osc.connect(this.gain);

        this.gain.gain.value = props.level || 1;

        this.lineout = {
            source: this.gain,
            dest: props.link
        };
    }
}

export default Oscillator;
