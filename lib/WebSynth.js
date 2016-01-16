'use strict';

import * as Modules from './src/modules';
import * as Props from './src/properties';
import { CONST, TYPES } from './src/core/Constants';
import Synth from './src/Synth';

class WebSynth {
    //TODO refactor with class or object comp....this is a mix....
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

        this.module = (type, label, props) => {
            synth.module(type, label, props);
            return this;
        };

        this.linkModules = (source, target) => {
            if (source === CONST.MASTER) {
                throw new Error('ERROR :: master can\'t be linked to any modules');
            }

            if (synth.modulesConfig[source] && synth.modulesConfig[target]) {
                synth.modulesConfig[source].props.link = target;
            }
        };

        this.listAllModules = () => {
            let methods = Object.keys(Modules),
                result = [];

            methods.map((e) => {
                result.push({
                    type: e,
                    props: this.getModuleProperties(e)
                });
            });

            return result;
        };

        this.listModules = () => {
            return synth.modulesConfig;
        };

        this.getModuleProperties = (type) => {
            const p = Props[type + 'Props'] || null;
            let ret = {};

            if (p) {
                ret = Object.assign({}, Props[type + 'Props'], Props.DefaultProps);
            }

            return ret;
        }
    }
}

export default WebSynth;
