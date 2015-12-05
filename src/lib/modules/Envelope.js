import { CONST, TYPES } from '../core/Constants'
import AudioContext from '../AudioContext'
import Module from '../core/Module'

class Envelope extends Module {

    constructor (props) {
        super(props);

        this.target = props.target || null;

        this.attack = props.attack;
        this.decay = props.decay;
        this.sustain = props.sustain;
        this.release = props.release;
    }

    createGain () {
        return false;
    }

    setEnvelope (dest) {
        let now = AudioContext.currentTime,
            envelope = this.level % 101,
            attackLevel = envelope * 72,  // Range: 0-7200: 6-octave range
            sustainLevel = attackLevel * this.sustain / 100.0, // range: 0-7200
            attackEnd = (this.attack / 20.0),
            t;

        if (!attackEnd) {
            attackEnd = 0.05; // tweak to get target decay to work properly
        }

        if (dest && dest.main && dest.main[this.target]) {
            t = dest.main[this.target];
            t.setValueAtTime(0, now);
            t.linearRampToValueAtTime(attackLevel, now + attackEnd);
            t.setTargetAtTime(sustainLevel, now + attackEnd, (this.decay / 100.0));
        }

    }

    resetEnvelope (dest) {
        let now = AudioContext.currentTime,
            t;

        if (dest && dest.main && dest.main[this.target]) {
            t = dest.main[this.target];
            t.cancelScheduledValues(now);
            t.setTargetAtTime(0, now, (this.release / 100.0));
        }
    }

    getLineOut () {
        return false;
    }
}

export default Envelope;
