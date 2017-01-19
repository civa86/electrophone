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
    }

    toString () {
        return this.name;
    }

    setupProperties (props) {
        let properties = props || {},
            propsHandler = this.toString() + 'Props',
            specificProps = Props[propsHandler],
            moduleProperties;

        moduleProperties = { ...Props.DefaultProps, ...specificProps };
        Object.keys(moduleProperties).forEach((e) => {
            this.setProperty(e, properties[e], moduleProperties[e]);
        });
    }

    getRealProperties (propName) {
        switch (propName) {
            case 'level' : return 'gain';
            case 'freq' : return 'frequency';
            case 'wave' : return 'type';
            case 'q' : return 'Q';
            case 'link' : return null;
            default : return propName;
        }
    }

    updateProperties (props) {
        //TODO implement setMainProperties and use it in each module????
        Object.keys(props).forEach(p => {
            let realProp = this.getRealProperties(p);

            if (this.main && realProp && this[p] !== props[p]) {
                if (realProp === 'gain' && this.gain && this.gain.gain) {
                    let l = (props[p] >= 0) ? props[p] % 101 : 100;
                    this.gain.gain.value = l / 100;
                } else if (this.main[realProp] !== undefined && this.main[realProp].value !== undefined) {
                    this.main[realProp].value = props[p];
                } else if (this.main[realProp] !== undefined) {
                    this.main[realProp] = props[p];
                }
            }
        });
    }

    setProperty (propKey, propVal, propConfig) {
        this[propKey] = null;
        if (propConfig.type && typeof propVal === propConfig.type) {
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
