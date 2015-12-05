import { CONST, TYPES } from '../core/Constants'
import AudioContext from '../AudioContext'
import Module from '../core/Module'

class Filter extends Module {

    constructor (props) {
        super(props);

        this.freq = +props.freq || 11000;
        this.q = +props.q || 10;
        //this.envelope = +props.envelope || 0;

        this.main = AudioContext.createBiquadFilter();
        this.main.type = props.type || CONST.FILTER_LOWPASS;

        ////TODO config envelope....introduce an Env Module!!!
        //this.env = {
        //    attack:  2,
        //    decay:   1,
        //    sustain: 100,
        //    release: 1
        //};

        this.setCutOff();
        this.setQ();
    }

    createGain () {
        return false;
    }

    setCutOff () {
        let cutOff = ((this.freq - 20) / (20000 - 20)) * (14.287712379549449 - 0) + 0;
        this.main.frequency.value = Math.pow(2, cutOff);
    }

    setQ () {
        let q = this.q % 21;
        this.main.Q.value = q;
    }

    //setEnvelope () {
    //    let now = AudioContext.currentTime,
    //        envelope = this.envelope % 101,
    //        filterAttackLevel = envelope * 72,  // Range: 0-7200: 6-octave range
    //        filterSustainLevel = filterAttackLevel * this.env.sustain / 100.0, // range: 0-7200
    //        filterAttackEnd = (this.env.attack / 20.0);
    //
    //    if (!filterAttackEnd) {
    //        filterAttackEnd = 0.05; // tweak to get target decay to work properly
    //    }
    //    //TODO let main parameter detune | frequency... configurable
    //    this.main.detune.setValueAtTime(0, now);
    //    this.main.detune.linearRampToValueAtTime(filterAttackLevel, now + filterAttackEnd);
    //    this.main.detune.setTargetAtTime(filterSustainLevel, now + filterAttackEnd, (this.env.decay / 100.0));
    //
    //}
    //
    //resetEnvelope () {
    //    let now = AudioContext.currentTime;
    //    //TODO let main parameter detune | frequency... configurable
    //    this.main.detune.cancelScheduledValues(now);
    //    this.main.detune.setTargetAtTime(0, now, (this.env.release / 100.0));
    //
    //}

    getLineIn (source) {
        if (source === TYPES.MODULATOR) {
            //TODO let main parameter detune | frequency... configurable
            return this.main.detune;
        } else {
            return this.main;
        }
    }

    getLineOut () {
        return this.main;
    }
}

export default Filter;
