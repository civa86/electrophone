'use strict';

import { TYPES } from '../core/Constants';
import Module from '../core/Module';
import EffectManager from './EffectManager';

class Effect extends Module {

    constructor (props, name) {
        super(props, name);
        this.main = null;
        this.mainEffect = null;
    }

    setMainEffect (type, mainEffect, props) {
        //TODO set an array of main effects??
        this.main = new EffectManager[type](props);
        this.mainEffect = this.main[mainEffect];
    }

    setMainProperties (props) {
        Object.keys(props).forEach((e) => {
            if (this.main[e]) {
                this.main[e] = props[e];
            }
        });
    }

    createGain () {
        return false;
    }

    getLineIn (sourceType, source) {
        if (sourceType === TYPES.MODULATOR) {
            return this.mainEffect[source.target];
        } else {
            return this.main.input;
        }
    }

    getLineOut () {
        return this.main.output;
    }

    getEnvelopeTarget (target) {
        let ret = null;

        if (target === 'gain') {
            ret = this.main.output.gain;
        } else if (this.main && this.mainEffect && this.mainEffect[target]) {
            ret = this.main.filter[target];
        }

        return ret;
    }

}

export default Effect;
