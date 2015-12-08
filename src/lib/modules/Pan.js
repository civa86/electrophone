import AudioContext from '../AudioContext'
import Module from '../core/Module'

class Pan extends Module {

    constructor (props) {
        super(props);

        let properties = props || {};

        this.main = AudioContext.createStereoPanner();
        this.main.pan.value = +properties.value || 0;
        this.main.connect(this.envelope);
    }
}

export default Pan;
