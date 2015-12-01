import * as Modules from './lib/modules'
import { CONST } from './lib/Constants'
import Synth from './lib/Synth'

class DecoratedSynth {
    constructor () {
        let synth = new Synth(),
            methods = Object.keys(Modules),
            fx;

        //Synth Module Creators
        for (let type of methods) {
            fx = type.toLowerCase();
            this[fx] = (label, props) => {
                synth.module(type, label, props);
                return this;
            }
        }

        this.play = (note) => synth.play(note);
        this.stop = (note) => synth.stop(note);
        this.VARS = CONST;
    }
}

export default DecoratedSynth;
