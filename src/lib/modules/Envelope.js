import AudioContext from '../AudioContext'
import Module from '../core/Module'

class Envelope extends Module {

    constructor (props) {
        super(props);
        //TODO check for method to call on update...like setMainProperties of Effect!!
    }

    getProperties () {
        return {
            target: {
                type: 'string',
                defaultValue: null
            },
            attack: {
                type: 'number',
                bounds: [0, 100],
                defaultValue: 1
            },
            decay: {
                type: 'number',
                bounds: [0, 100],
                defaultValue: 1
            },
            sustain: {
                type: 'number',
                bounds: [1, 100],
                defaultValue: 100
            },
            release: {
                type: 'number',
                bounds: [0.001, 100],
                defaultValue: 5
            }
        };
    }

    createGain () {
        return false;
    }

    getReleaseTime () {
        let now = AudioContext.currentTime,
            release;

        if (this.release) {
            release = now + (this.release / 10.0);
        } else {
            release = now + 0.2;
        }

        return release;
    }

    setEnvelope (dest) {
        let now = AudioContext.currentTime,
            envelope = this.level % 101,
            attackLevel,
            sustainLevel,
            attackEnd = (this.attack / 20.0),
            t;

        if (this.target === 'gain') {
            attackLevel = envelope / 100;
            sustainLevel = this.sustain / 100.0;
        } else {
            attackLevel = envelope * 72;  // Range: 0-7200: 6-octave range
            sustainLevel = attackLevel * this.sustain / 100.0; // range: 0-7200
        }

        if (!attackEnd) {
            attackEnd = 0.05; // tweak to get target decay to work properly
        }

        if (dest && typeof dest.getEnvelopeTarget === 'function') {
            t = dest.getEnvelopeTarget(this.target);

            if (t) {
                t.setValueAtTime(0, now);
                t.linearRampToValueAtTime(attackLevel, now + attackEnd);
                t.setTargetAtTime(sustainLevel, now + attackEnd, (this.decay / 100.0));
            }
        }

    }

    resetEnvelope (dest) {
        let now = AudioContext.currentTime,
            t;

        if (dest && typeof dest.getEnvelopeTarget === 'function') {
            t = dest.getEnvelopeTarget(this.target);

            if (t) {
                t.cancelScheduledValues(now);
                if (this.target === 'gain') {
                    t.setValueAtTime(t.value, now);
                }
                t.setTargetAtTime(0, now, (this.release / 100.0));
            }
        }
    }

    getLineOut () {
        return false;
    }
}

export default Envelope;
