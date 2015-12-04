import AudioContext from '../AudioContext'

class Module {

    constructor (props) {
        this.gain = null;
        this.lineout = null;
        this.link = props.link || null;
        this.createGain(props.level);
    }

    createGain (level) {
        this.gain = AudioContext.createGain();
        this.gain.gain.value = (level && level >= 0) ?  level : 1;
        this.lineout = this.gain;
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

    //linkModule (source) {
    //    source.gain.connect(this.lineout);
    //}
}

export default Module;
