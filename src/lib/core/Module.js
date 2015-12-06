import AudioContext from '../AudioContext'

class Module {

    constructor (props) {
        this.gain = null;
        this.main = null;
        this.link = props.link || null;
        this.level = +props.level;

        this.createGain(this.level);
    }

    createGain (level) {
        let l = (level >= 0) ?  level % 101 : 100;
        //TODO create two gians...one for envelope and one as output to se finale level!!
        //TODO now if you put an envelope on gain your module level prop is ignored because envelope insist on same gain....
        this.gain = AudioContext.createGain();
        this.gain.gain.value = l / 100;
    }

    disconnect () {
        this.gain.disconnect();
    }

    getLineIn () {
        return this.main;
    }

    getLineOut () {
        return this.gain;
    }

    getEnvelopeTarget (target) {
        let ret = null;

        if (this.main && this.main[target]) {
            ret = this.main[target];
        } else if (target === 'gain' && this.gain) {
            ret = this.gain.gain;
        }

        return ret;
    }
}

export default Module;
