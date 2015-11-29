//Web Audio Context
import AudioContext from '../AudioContext'

class Oscillator {

    constructor (props) {
        this.osc = AudioContext.createOscillator();
        this.gain = AudioContext.createGain();

        this.osc.type = props.type || 'sine';
        this.osc.detune.value = props.detune || 0;
        this.osc.connect(this.gain);

        this.gain.gain.value = props.level || 1;

        this.lineout = {
            source: this.gain,
            dest: props.link
        };
    }

    setNote (note) {
        this.osc.frequency.value = note;
    }

    noteOn () {
        this.osc.start(0);
        this.osc.stop(AudioContext.currentTime + 5);
    }

    noteOff () {
        this.osc.stop(0);
    }
}

export default Oscillator;
