import AudioContext from '../AudioContext'

class Module {

    constructor (props) {
        this.gain = null;
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
}

export default Module;
