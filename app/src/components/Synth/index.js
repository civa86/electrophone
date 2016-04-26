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

        if (audioContext) {
            //TODO write a synth service unit tested!
            this.synth = new WebSynth(audioContext);
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

        //CREATE / UPDATE
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

        //DELETE
        Object.keys(currentModules)
            .filter(e => e !== WebSynth.CONST.MASTER && e !== WebSynth.CONST.ADSR)
            .forEach(moduleId => {
                const found = modules.filter(e => e.id === moduleId).pop();
                if (!found) {
                    this.synth.destroy(moduleId);
                }
            });
    }

    refreshLinks (modules) {
        modules.forEach(e => {
            if (!e.isMaster && e.link) {
                this.synth.link(e.id, e.link);
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
        const { footerHeight } = this.props;

        return (
            <div id="synth" style={{ bottom: footerHeight }}>
                <div id="keyboard" className="closed">
                    <div className="key-white" data-action="60"><span>C</span>
                        <div className="key-black" data-action="61"><span>C#</span></div>
                    </div>
                    <div className="key-white" data-action="62"><span>D</span>
                        <div className="key-black" data-action="63"><span>D#</span></div>
                    </div>
                    <div className="key-white" data-action="64"><span>E</span></div>
                    <div className="key-white" data-action="65"><span>F</span>
                        <div className="key-black" data-action="66"><span>F#</span></div>
                    </div>
                    <div className="key-white" data-action="67"><span>G</span>
                        <div className="key-black" data-action="68"><span>G#</span></div>
                    </div>
                    <div className="key-white" data-action="69"><span>A</span>
                        <div className="key-black" data-action="70"><span>A#</span></div>
                    </div>
                    <div className="key-white" data-action="71"><span>B</span></div>
                </div>
                <GlobalKeys keyboardMapping={this.getKeyboardMapping()}/>
            </div>
        )
    }
}

export default Synth;
