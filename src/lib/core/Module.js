import AudioContext from '../AudioContext'

class Module {

    constructor (props) {
        this.gain = null;

        this.createGain(props.level);
    }

    createGain (level) {
        this.gain = AudioContext.createGain();
        this.gain.gain.value = (level && level >= 0) ?  level : 1;
    }
}

export default Module;
