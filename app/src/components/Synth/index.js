import React, { Component } from 'react';
//TODO check...you are importing web-synth source code...try with dist version!
import WebSynth from 'web-synth';
import GlobalKeys from '../GlobalKeys';
import PianoKeyNote from './PianoKeyNote'

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

    playNoteFromKey (event, key) {
        const { state } = this.props;

        if (event && typeof event.stopPropagation === 'function') {
            event.stopPropagation();
        }

        if (noteMapping[key]) {
            this.synth.play(
                WebSynth.getFrequency(noteMapping[key], state.octave)
            );
        }
    }

    stopNoteFromKey (event, key) {
        const { state } = this.props;

        if (event && typeof event.stopPropagation === 'function') {
            event.stopPropagation();
        }

        if (noteMapping[key]) {
            this.synth.stop(
                WebSynth.getFrequency(noteMapping[key], state.octave)
            );
        }
    }

    getKeyboardMapping () {
        return [
            {
                keys: Object.keys(noteMapping).map(Number),
                down: (event, key) => this.playNoteFromKey(event, key),
                up: (event, key) => this.stopNoteFromKey(event, key)
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
        const { footerHeight, isPianoVisible } = this.props;

        return (
            <div id="synth" style={{ bottom: footerHeight }}>
                <div id="keyboard" className={(!isPianoVisible) ? 'closed' : ''}>
                    <PianoKeyNote note={{ key: 65, label: 'C' }}
                                  semiNote={{ key: 87, label: 'C#' }}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}/>

                    <PianoKeyNote note={{ key: 83, label: 'D' }}
                                  semiNote={{ key: 69, label: 'D#' }}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}/>

                    <PianoKeyNote note={{ key: 68, label: 'E' }}
                                  semiNote={null}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}/>

                    <PianoKeyNote note={{ key: 70, label: 'F' }}
                                  semiNote={{ key: 84, label: 'F#' }}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}/>

                    <PianoKeyNote note={{ key: 71, label: 'G' }}
                                  semiNote={{ key: 89, label: 'G#' }}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}/>

                    <PianoKeyNote note={{ key: 72, label: 'A' }}
                                  semiNote={{ key: 85, label: 'A#' }}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}/>

                    <PianoKeyNote note={{ key: 74, label: 'B' }}
                                  semiNote={null}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}/>
                </div>

                <GlobalKeys keyboardMapping={this.getKeyboardMapping()}/>
            </div>
        )
    }
}

export default Synth;
