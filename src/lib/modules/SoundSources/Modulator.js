import { CONST, TYPES } from '../../core/Constants'
import AudioContext from '../../AudioContext'
import SoundSource from '../../core/SoundSource'

class Modulator extends SoundSource {

    constructor (props, name) {
        super(props, name);
        //TODO separate in a method to call on update...like setMainProperties of Effect!!
        this.main = AudioContext.createOscillator();
        this.main.type = this.wave;
        this.main.connect(this.envelope);
    }

    setNote () {
        let f =  this.freq % 11;
        this.main.frequency.value = f;
    }
}

export default Modulator;
