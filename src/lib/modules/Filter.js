import { CONST } from '../core/Constants'
import AudioContext from '../AudioContext'
import Module from '../core/Module'

class Filter extends Module {

    constructor (props) {
        super(props);

        this.main = AudioContext.createBiquadFilter();

        this.main.type = props.type || CONST.FILTER_LOWPASS;
        this.main.frequency.value = props.frequency || 440;
        this.main.connect(this.gain);

        this.lineout = {
            source: this.gain,
            dest: props.link
        };
    }
}

export default Filter;
