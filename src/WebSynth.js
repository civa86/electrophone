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

        this.listAllModules = () => {
            let methods = Object.keys(Modules),
                result,
                propName,
                props,
                tmp;

            result = methods.reduce((res, e) => {
                propName = e + 'Props';
                props = Props[propName] || {};
                props = Object.assign(props, Props.DefaultProps);

                tmp = {
                    name: e,
                    props: props
                };

                res.push(tmp);
                return res;
            }, []);

            return result;
        };

        this.listModules = () => {
            return synth.modulesConfig;
        }
    }
}

export default WebSynth;
