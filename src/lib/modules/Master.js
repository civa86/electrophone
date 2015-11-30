//Web Audio Context
import AudioContext from '../AudioContext'

class Master {

    constructor (props) {
        this.envelope = AudioContext.createGain();
        this.env = {
            attack:  0,
            decay:   0,
            sustain: 1,
            release: 0
        };

        this.lineout = {
            source: this.envelope
        };
    }

    setEnvelope (now, envAttackEnd, currentEnvS, currentEnvD) {
        this.envelope.gain.value = 0.0;
        this.envelope.gain.setValueAtTime(0.0, now);
        this.envelope.gain.linearRampToValueAtTime(1.0, envAttackEnd);
        this.envelope.gain.setTargetAtTime((currentEnvS / 100.0), envAttackEnd, (currentEnvD / 100.0) + 0.001);
    }

    resetEnvelope (now, currentEnvR) {
        this.envelope.gain.cancelScheduledValues(now);
        this.envelope.gain.setValueAtTime(this.envelope.gain.value, now);
        this.envelope.gain.setTargetAtTime(0.0, now, (currentEnvR / 100));
    }
}

export default Master;
