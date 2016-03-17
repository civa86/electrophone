import _ from 'lodash';
import * as Props from '../properties';

class Module {

    constructor (audioContext, props, name) {
        this.name = name;
        this.audioContext = audioContext;
        this.gain = null;
        this.envelope = null;
        this.main = null;

        this.setupProperties(props);

        this.createGain(this.level);

        //console.log(this.name, this);
    }

    toString () {
        return this.name;
    }

    setupProperties (props) {
        let properties = props || {},
            propsHandler = this.toString() + 'Props',
            moduleProperties;

        //TODO assign properties configuration to class ....
        moduleProperties = _.assign({}, Props.DefaultProps, Props[propsHandler]);
        Object.keys(moduleProperties).forEach((e) => {
            this.setProperty(e, properties[e], moduleProperties[e]);
        });
    }

    updateProperties (/*props*/) {
        //TODO apply properties update
        //console.log('ipdate props', this.toString(), props);
    }

    setProperty (propKey, propVal, propConfig) {
        //TODO read  propConfig -> properties configuration to class ....
        this[propKey] = null;
        if (propConfig.type && typeof propVal === propConfig.type) {
            //TODO check propval && bounds....set a value...
            //TODO use _.inRange for numbers!
            this[propKey] = propVal;
        } else if (propConfig.defaultValue !== undefined) {
            this[propKey] = propConfig.defaultValue;
        }
    }

    createGain (level) {
        let l = (level >= 0) ?  level % 101 : 100;
        this.gain = this.audioContext.createGain();
        this.envelope = this.audioContext.createGain();
        this.gain.gain.value = l / 100;
        this.envelope.gain.value = 1;

        this.envelope.connect(this.gain);
    }

    //TODO used method?
    disconnect () {
        this.gain.disconnect();
    }

    getLineIn () {
        return this.main;
    }

    getLineOut () {
        return this.gain;
    }

    getEnvelopeTarget (target) {
        let ret = null;

        if (this.main && this.main[target]) {
            ret = this.main[target];
        } else if (target === 'gain' && this.gain) {
            ret = this.envelope.gain;
        }
        return ret;
    }
}

export default Module;
