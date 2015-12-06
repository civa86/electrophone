import * as Modules from './lib/modules'
import { CONST } from './lib/core/Constants'
import Synth from './lib/Synth'

class WebSynth {
    constructor (props) {
        let synth = new Synth(props),
            methods = Object.keys(Modules),
            fx;

        this.VARS = CONST;

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
    }
}

export default WebSynth;
