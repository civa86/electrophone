//Web Audio Context
import AudioContext from '../AudioContext'
import Module from '../core/Module'

class Filter extends Module {

    constructor (props) {
        super(props);

        this.filter = AudioContext.createBiquadFilter();

        this.filter.type = props.type || 'lowpass';
        this.filter.frequency.value = props.frequency || 440;
        this.filter.connect(this.gain);

        this.lineout = {
            source: this.filter,
            dest: props.link
        };
    }
}

export default Filter;
