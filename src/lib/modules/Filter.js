//Web Audio Context
import AudioContext from '../AudioContext'

class Filter {

    constructor (props) {
        this.filter = AudioContext.createBiquadFilter();

        this.filter.type = props.type || 'lowpass';
        this.filter.frequency.value = props.frequency || 440;

        this.lineout = {
            source: this.filter,
            dest: props.link
        };
    }
}

export default Filter;
