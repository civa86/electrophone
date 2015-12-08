import AudioContext from '../AudioContext'
import Module from '../core/Module'

class Pan extends Module {

    constructor (props) {
        super(props);

        this.main = AudioContext.createStereoPanner();
        this.main.pan.value = this.value;
        this.main.connect(this.envelope);
    }

    getProperties () {
        return {
            value: {
                type: 'number',
                bounds: [-1, 1],
                defaultValue: 0
            }
        };
    }
}

export default Pan;
