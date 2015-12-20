import AudioContext from '../AudioContext'
import * as Props from '../properties'

class Module {

    constructor (props, name) {
        this.name = name;
        this.gain = null;
        this.envelope = null;
        this.main = null;

        this.setupProperties(props);

        this.createGain(this.level);
    }

    toString () {
        return this.name;
    }

    setupProperties (props) {
        let properties = props || {},
            defaultProperties = {
                link:  {
                    type:         'string',
                    defaultValue: ''
                },
                level: {
                    type:         'number',
                    bounds:       [0, 100],
                    defaultValue: 100
                }
            },
            propsHandler = this.toString() + 'Props',
            customProps = Props[propsHandler] || {};

        defaultProperties = Object.assign(defaultProperties, customProps);

        Object.keys(defaultProperties).forEach((e) => {
            this.setProperty(e, properties[e], defaultProperties[e]);
        });
    }

    setProperty (propKey, propVal, propConfig) {
        this[propKey] = null;
        if (propConfig.type && typeof propVal === propConfig.type) {
            //TODO check propval && bounds....set a value...
            this[propKey] = propVal;
        } else if (propConfig.defaultValue !== undefined) {
            this[propKey] = propConfig.defaultValue;
        }
    }

    createGain (level) {
        let l = (level >= 0) ?  level % 101 : 100;
        this.gain = AudioContext.createGain();
        this.envelope = AudioContext.createGain();
        this.gain.gain.value = l / 100;
        this.envelope.gain.value = 1;

        this.envelope.connect(this.gain);
    }

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
