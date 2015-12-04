import AudioContext from '../AudioContext'

class Module {

    constructor (props) {
        this.gain = null;
        this.link = null;
        this.lineout = null;

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

    linkModule (source) {
        source.gain.connect(this.lineout);
    }
}

export default Module;
