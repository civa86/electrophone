//Web Audio Context
import AudioContext from './AudioContext'

//Modules
import * as Modules from './modules'

class Synth {

    constructor () {
        this.master = AudioContext.createGain();
        this.master.connect(AudioContext.destination);
        this.modules = {};
        this.set = {};
        this.voices = [];
    }

    module (type, label, props) {
        if (!type || type.constructor !== String) {
            throw new Error('Synth Module :: missing type');
        }

        if (!label || label.constructor !== String) {
            throw new Error('Synth Module :: missing label');
        }

        if (!props || props.constructor !== Object) {
            throw new Error('Synth Module :: missing properties');
        }

        if (!Modules[type]) {
            throw new Error('Synth Module :: module ' + type + ' not found');
        }

        this.modules[label] = {
            type,
            props
        };
    }

    linkModules () {
        let lineout,
            source,
            dest,
            out;

        for (let mod of Object.keys(this.set)) {
            lineout = this.set[mod].lineout;
            source = lineout.source;
            dest = lineout.dest;

            source.disconnect();
            if (dest === 'master') {
                out = this.master;
            } else if (this.set[dest]) {
                out = this.set[dest].lineout.source;
            }

            source.connect(out);
        }

    }

    setupModules () {
        let voices = [];

        for (let mod of Object.keys(this.modules)) {
            this.set[mod] = new Modules[this.modules[mod].type](this.modules[mod].props);
            if (this.modules[mod].type === 'Oscillator') {
                voices.push(this.set[mod].osc);
            }
        }

        this.linkModules();

        return voices;
    }

    createVoices () {
        let voices = this.setupModules();
        this.voices = voices;
        this.master.gain.value = 1;
    }

    play (t = 0.2) {
        this.createVoices();
        for (let v of this.voices) {
            v.start(0);
            v.stop(AudioContext.currentTime + t);
        }
    }

    stop () {
        this.master.gain.value = 0;
        this.voices = [];
    }

    static publish (synth) {
        let ret = {},
            methods = Object.keys(Modules),
            fx;

        //Synth Module Creators
        for (let type of methods) {
            fx = type.toLowerCase();
            ret[fx] = (label, props) => {
                synth.module(type, label, props);
            }
        }

        //Public Method
        ret.play = (t) => synth.play(t);
        ret.stop = () => synth.stop();

        return ret;
    }
}

class decoratedSynth {
    constructor () {
        let synth = new Synth();

        let methods = Object.keys(Modules),
            fx;

        //Synth Module Creators
        for (let type of methods) {
            fx = type.toLowerCase();
            this[fx] = (label, props) => {
                synth.module(type, label, props);
            }
        }

        this.play = (t) => synth.play(t);
        this.stop = () => synth.stop();
    }
}

export default decoratedSynth;
