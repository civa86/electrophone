import AudioContext from '../AudioContext'

class Module {

    constructor (props) {
        this.gain = null;
        this.link = props.link || null;
        this.level = +props.level || 1;
        this.createGain(this.level);
    }

    createGain (level) {
        this.gain = AudioContext.createGain();
        this.gain.gain.value = (+level >= 0) ?  level : 1;
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
}

export default Module;
