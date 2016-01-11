'use strict';

import * as Modules from './src/modules';
import * as Props from './src/properties';
import { CONST, TYPES } from './src/core/Constants';
import Synth from './src/Synth';

class WebSynth {
    constructor (props) {
        let properties = props || {},
            synth = new Synth(properties),
            methods = Object.keys(Modules),
            fx;

        this.VARS = CONST;
        this.TYPES = TYPES;

        //Synth Module Creators
        for (let type of methods) {
            fx = type.toLowerCase();
            this[fx] = (label, props) => {
                synth.module(type, label, props);
                return this;
            };
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
                //TODO refactor props as array?? you can sort it...otherwise use sort of keys and read...
                propName = e + 'Props';
                props = Props[propName] || {};
                props = Object.assign(props, Props.DefaultProps);

                tmp = {
                    type: e,
                    props: props
                };

                res.push(tmp);
                return res;
            }, []);

            return result;
        };

        this.listModules = () => {
            return synth.modulesConfig;
        };
    }
}

export default WebSynth;
