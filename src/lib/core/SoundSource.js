import AudioContext from '../AudioContext'
import Module from '../core/Module'

class SoundSource extends Module {

    constructor (props) {
        super(props);
    }

    noteOn () {
        this.main.start(0);
    }

    noteOff (release) {
        this.main.stop(release);
    }
}

export default SoundSource;
