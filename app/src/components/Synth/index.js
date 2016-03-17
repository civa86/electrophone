import React, { Component } from 'react';
//TODO check...you are importing web-synth source code...try with dist version!
import WebSynth from 'web-synth';
import GlobalKeys from '../GlobalKeys';

//TODO check for spectrum and others init props of synth....pass them from App!!
//TODO wrtie a synth maanger?
const noteMapping = {
    65: 'C',    //a
    87: 'C#',   //w
    83: 'D',    //s
    69: 'D#',   //e
    68: 'E',    //d
    70: 'F',    //f
    84: 'F#',   //t
    71: 'G',    //g
    89: 'G#',   //y
    72: 'A',    //h
    85: 'A#',   //u
    74: 'B'     //j
};

class Synth extends Component {

    constructor (props) {
        super(props);

        const { audioContext } = this.props;

        if (audioContext && typeof audioContext === 'function') {
            this.synth = new WebSynth(new audioContext());
        }

    }

    getKeyboardMapping () {
        const { state } = this.props;
        return [
            {
                keys: Object.keys(noteMapping).map(Number),
                down: (event, key) => {
                    if (noteMapping[key]) {
                        this.synth.play(
                            WebSynth.getFrequency(noteMapping[key], state.octave)
                        );
                    }
                },
                up: (event, key) => {
                    if (noteMapping[key]) {
                        this.synth.stop(
                            WebSynth.getFrequency(noteMapping[key], state.octave)
                        );
                    }
                }
            }
        ]
    }

    refreshModules (modules) {
        const currentModules = this.synth.getModules();

        modules.forEach(e => {
            if (e.isMaster) {
                this.updateMaster(e.properties);
            } else {
                if (currentModules[e.id]) {
                    this.updateModule(e.id, e.properties, e.link);
                } else {
                    this.createModule(e.id, e.type, e.properties, e.link)
                }
            }
        });
    }

    refreshLinks (modules) {
        modules.forEach(e => {
            if (!e.isMaster && e.link) {
                this.synth.linkModules(e.id, e.link);
            }
        });
    }

    updateMaster (props) {
        this.synth.master(
            props
                .filter(e => e.name === 'level')
                .reduce((res, p) => {
                    res[p.name] = p.value;
                    return res;
                }, {}));

        this.synth.adsr(
            props
                .filter(e => e.name !== 'level')
                .reduce((res, p) => {
                    res[p.name] = p.value;
                    return res;
                }, {}));
    }

    updateModule (id, props) {
        this.synth.update(
            id,
            props.reduce((res, p) => {
                res[p.name] = p.value;
                return res;
            }, {})
        );
    }

    createModule (id, type, props) {
        this.synth.create(
            id,
            type,
            props.reduce((res, p) => {
                res[p.name] = p.value;
                return res;
            }, {})
        );
    }

    componentWillReceiveProps (newProps) {
        if (newProps && newProps.state && newProps.state.modules) {
            this.refreshModules(newProps.state.modules);
            this.refreshLinks(newProps.state.modules);
        }
    }

    render () {
        return (
            <div style={{ display: 'none' }}>
                <GlobalKeys keyboardMapping={this.getKeyboardMapping()}/>
            </div>
        )
    }
}

export default Synth;
