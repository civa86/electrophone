import AudioContext from '../AudioContext'
import Module from '../core/Module'

class Master extends Module {

    constructor (props) {
        super(props);

        this.main = AudioContext.createGain();
        this.link = null;
    }

    getLineIn () {
        return this.main;
    }

    lineOut () {
        this.main.connect(this.gain);
        this.gain.connect(AudioContext.destination);
    }
}

export default Master;
