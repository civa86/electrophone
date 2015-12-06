import { CONST, TYPES } from '../core/Constants'
import AudioContext from '../AudioContext'
import Module from '../core/Module'
import EffectManager from './EffectManager'

class Effect extends Module {

    constructor (props) {
        super(props);
        this.main = null;
        this.mainEffect = null;
    }

    setMainEffect (type, mainEffect, props) {
        this.main = new EffectManager[type](props);
        this.mainEffect = this.main[mainEffect];
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
            ret = this.main.filter[target]
        }

        return ret;
    }

}

export default Effect;
