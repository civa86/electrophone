import { CONST, TYPES } from '../core/Constants'
import AudioContext from '../AudioContext'
import SoundSource from '../core/SoundSource'

class Modulator extends SoundSource {

    constructor (props) {
        super(props);

        let properties = props || {};

        this.freq = +properties.freq || 440;
        this.target = properties.target || 'frequency';

        this.main = AudioContext.createOscillator();
        this.main.type = properties.type || CONST.WAVE_SINE;
        this.main.connect(this.envelope);
    }

    setNote () {
        let f =  this.freq % 11;
        this.main.frequency.value = f;
    }

    //TODO refactor in parent class
    getLineIn (sourceType, source) {
        if (sourceType === TYPES.MODULATOR) {
            return this.main[source.target];
        } else {
            return this.main.frequency;
        }
    }
}

export default Modulator;
