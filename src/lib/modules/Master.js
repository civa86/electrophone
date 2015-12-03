import { CONST } from '../core/Constants'
import AudioContext from '../AudioContext'
import Module from '../core/Module'

class Master extends Module {

    constructor (props) {
        super(props);

        this.envelope = AudioContext.createGain();
        this.env = props.envelope || null;

        this.lineout = {
            source: this.envelope
        };
    }

    setEnvelope () {
        let now = AudioContext.currentTime,
            envAttackEnd;

        this.envelope.gain.value = 0.0;

        if (this.env) {
            envAttackEnd = now + (this.env.attack / 20.0);
            this.envelope.gain.setValueAtTime(0.0, now);
            this.envelope.gain.linearRampToValueAtTime(1.0, envAttackEnd);
            this.envelope.gain.setTargetAtTime(
                (this.env.sustain / 100.0),
                envAttackEnd,
                (this.env.decay / 100.0) + 0.001
            );
        } else {
            this.envelope.gain.setValueAtTime(0.0, now);
            this.envelope.gain.linearRampToValueAtTime(1.0, now + 0.02);
            this.envelope.gain.setTargetAtTime(1, now + 0.02, 0 + 0.001);
            this.envelope.gain.value = 1;
        }
    }

    releaseEnvelope () {
        let now = AudioContext.currentTime,
            release;
        if (this.env) {
            this.envelope.gain.cancelScheduledValues(now);
            this.envelope.gain.setValueAtTime(this.envelope.gain.value, now);
            this.envelope.gain.setTargetAtTime(0.0, now, (this.env.release / 100));
            release = now + (this.env.release / 10.0);
        } else {
            this.envelope.gain.cancelScheduledValues(now);
            this.envelope.gain.setValueAtTime(this.envelope.gain.value, now);
            this.envelope.gain.setTargetAtTime(0.0, now, 0.05);
            release = now + 0.2;
        }

        return release;
    }
}

export default Master;
