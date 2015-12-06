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
