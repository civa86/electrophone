import AudioContext from '../AudioContext'
import SoundSource from '../core/SoundSource'

class Noise extends SoundSource {

    constructor (props) {
        super(props);

        this.noise = AudioContext.createBufferSource();
        this.noise.connect(this.gain);

        this.color = props.color || 'white';

        this.lineout = {
            source: this.gain,
            dest: props.link
        };

        this.setColor();
    }

    setColor () {
        switch (this.color) {
            case 'white' :
                this.noise.buffer = this.white();
                break;
            case 'pink' :
                this.noise.buffer = this.pink();
                break;
            case 'brown' :
                this.noise.buffer = this.brown();
                break;
            default :
                throw new Error('Invalid Noise color: ' + this.color);
        }
    }

    white () {
        let noiseBuffer = this.getNoiseBuffer(),
            bufferSize = this.getBufferSize(),
            output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        return noiseBuffer;
    }

    pink () {
        let b0, b1, b2, b3, b4, b5, b6,
            noiseBuffer = this.getNoiseBuffer(),
            bufferSize = this.getBufferSize(),
            output = noiseBuffer.getChannelData(0),
            white;

        b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;

        for (let i = 0; i < bufferSize; i++) {
            white = Math.random() * 2 - 1;

            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;

            output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            output[i] *= 0.11;
            b6 = white * 0.115926;
        }

        return noiseBuffer;
    }

    brown () {
        let noiseBuffer = this.getNoiseBuffer(),
            bufferSize = this.getBufferSize(),
            output = noiseBuffer.getChannelData(0),
            lastOut = 0.0,
            white;

        for (let i = 0; i < bufferSize; i++) {
            white = white = Math.random() * 2 - 1;

            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5;
        }

        return noiseBuffer;
    }

    setNote () {
        this.noise.loop = true;
    }

    getBufferSize () {
        return 2 * AudioContext.sampleRate;
    }

    getNoiseBuffer () {
        let bufferSize = this.getBufferSize(),
            noiseBuffer = AudioContext.createBuffer(1, bufferSize, AudioContext.sampleRate);
        return noiseBuffer;
    }

    noteOn () {
        this.noise.start(0);
    }

    noteOff (release) {
        this.noise.stop(release);
    }
}

export default Noise;
