import AudioContext from '../AudioContext'

class Module {

    constructor (props) {
        //TODO introduce this security line in all modules....
        //let properties = props || {};
        this.gain = null;
        this.envelope = null;
        this.main = null;
        this.link = props.link || null;
        this.level = +props.level;

        this.createGain(this.level);
    }

    createGain (level) {
        let l = (level >= 0) ?  level % 101 : 100;
        this.gain = AudioContext.createGain();
        this.envelope = AudioContext.createGain();
        this.gain.gain.value = l / 100;
        this.envelope.gain.value = 1;

        this.envelope.connect(this.gain);
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
            ret = this.envelope.gain;
        }

        return ret;
    }
}

export default Module;
