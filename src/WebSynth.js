import * as Modules from './lib/modules'
import * as Props from './lib/properties'

import { CONST } from './lib/core/Constants'
import Synth from './lib/Synth'

class WebSynth {
    constructor (props) {
        let properties = props || {},
            synth = new Synth(properties),
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

        this.listModules = () => {
            let methods = Object.keys(Modules),
                result,
                propName,
                props;

            result = methods.reduce((res, e) => {
                propName = e + 'Props';
                props = Props[propName] || {};

                //TODO set level and add global module properties....

                res[e] = props;

                return res;
            }, {});

            return result;
        };
    }
}

export default WebSynth;
