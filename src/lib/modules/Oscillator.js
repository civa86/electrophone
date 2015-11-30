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
            dest:   props.link
        };
    }

    setNote (note) {
        this.osc.frequency.value = note;
    }

    noteOn () {
        let currentEnvA = 2,
            currentEnvD = 15,
            currentEnvS = 0,
            currentEnvR = 5,
            now = AudioContext.currentTime,
            envAttackEnd = now + (currentEnvA / 20.0);

        this.gain.gain.value = 0.0;
        this.gain.gain.setValueAtTime(0.0, now);
        this.gain.gain.linearRampToValueAtTime(1.0, envAttackEnd);
        this.gain.gain.setTargetAtTime((currentEnvS / 100.0), envAttackEnd, (currentEnvD / 100.0) + 0.001);

        this.osc.start(0);
    }

    noteOff () {
        let currentEnvA = 2,
            currentEnvD = 15,
            currentEnvS = 68,
            currentEnvR = 5,
            now = AudioContext.currentTime,
            release = now + (currentEnvR / 10.0);

        this.gain.gain.cancelScheduledValues(now);
        this.gain.gain.setValueAtTime(this.gain.gain.value, now);
        this.gain.gain.setTargetAtTime(0.0, now, (currentEnvR / 100));
        this.osc.stop(release);
    }
}

export default Oscillator;
