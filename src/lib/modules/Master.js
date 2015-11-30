//Web Audio Context
import AudioContext from '../AudioContext'

class Master {

    constructor (props) {
        this.gain = AudioContext.createGain();
        this.envelope = AudioContext.createGain();
        this.env = props.envelope;

        this.gain.gain.value = (props.level >= 0) ?  props.level : 1;

        this.lineout = {
            source: this.envelope
        };
    }

    setEnvelope () {
        let now = AudioContext.currentTime,
            envAttackEnd = now + (this.env.attack / 20.0);

        this.envelope.gain.value = 0.0;
        this.envelope.gain.setValueAtTime(0.0, now);
        this.envelope.gain.linearRampToValueAtTime(1.0, envAttackEnd);
        this.envelope.gain.setTargetAtTime((this.env.sustain / 100.0), envAttackEnd, (this.env.decay / 100.0) + 0.001);
    }

    resetEnvelope () {
        let now = AudioContext.currentTime;

        this.envelope.gain.cancelScheduledValues(now);
        this.envelope.gain.setValueAtTime(this.envelope.gain.value, now);
        this.envelope.gain.setTargetAtTime(0.0, now, (this.env.release / 100));
    }
}

export default Master;
