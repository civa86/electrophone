import React, { Component } from 'react';
import $ from 'jquery';

import ElectroPhone from 'electrophone';
import GlobalKeys from '../GlobalKeys';
import PianoKeyNote from './PianoKeyNote'

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
    updateSpectrum (dataArray) {
        const
            k = 256.0,
            sliceWidth = this.spectrumProps.WIDTH * (dataArray.length / this.spectrumProps.WIDTH) / k;
        let x = 0;

        this.spectrumProps.canvasCtx.fillStyle = 'rgb(51, 51, 51)';
        this.spectrumProps.canvasCtx.fillRect(0, 0, this.spectrumProps.WIDTH, this.spectrumProps.HEIGHT);

        for (let i = 0; i < dataArray.length; i++) {
            const v = dataArray[i] / k,
                y = this.spectrumProps.HEIGHT - (v * this.spectrumProps.HEIGHT);

            this.spectrumProps.canvasCtx.fillStyle = 'rgb(70, 188, 236)';
            this.spectrumProps.canvasCtx.fillRect(x, y, sliceWidth - 2, this.spectrumProps.HEIGHT - y);
            x += sliceWidth;
            this.spectrumProps.canvasCtx.stroke();
        }
    }

    resetSpectrum () {
        this.spectrumProps.canvasCtx.clearRect(0, 0, this.spectrumProps.WIDTH, this.spectrumProps.HEIGHT);
    }

    playNoteFromKey (event, key) {
        const { state, updatePlayingVoices, isOperationInProgress } = this.props;

        if (!isOperationInProgress()) {
            if (event && typeof event.stopPropagation === 'function') {
                event.stopPropagation();
            }

            if (noteMapping[key]) {
                this.synth.play(
                    ElectroPhone.getFrequency(noteMapping[key], state.octave)
                );

                if (typeof updatePlayingVoices === 'function') {
                    const voiceLabel = key + '-' + state.octave;

                    if (state.playingVoices.indexOf(voiceLabel) === -1) {
                        updatePlayingVoices([...state.playingVoices, voiceLabel]);
                    }
                }
            }
        }
    }

    stopNoteFromKey (event, key) {
        const { state, updatePlayingVoices, isOperationInProgress } = this.props;

        if (!isOperationInProgress()) {
            if (event && typeof event.stopPropagation === 'function') {
                event.stopPropagation();
            }

            if (noteMapping[key]) {
                this.synth.stop(
                    ElectroPhone.getFrequency(noteMapping[key], state.octave)
                );

                if (typeof updatePlayingVoices === 'function') {
                    const voiceLabel = key + '-' + state.octave;
                    updatePlayingVoices(state.playingVoices.filter(e => e !== voiceLabel));
                }
            }
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
              .filter(e => e !== ElectroPhone.CONST.MASTER && e !== ElectroPhone.CONST.ADSR)
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

    componentDidMount () {
        const
            { audioContext } = this.props,
            spectrumCanvasCtxElement = document.getElementById('spectrum');

        this.spectrumProps = {
            canvasCtx: spectrumCanvasCtxElement.getContext('2d'),
            WIDTH: $("#spectrum").width(),
            HEIGHT: 200
        };

        this.resetSpectrum();

        if (audioContext) {
            this.synth = new ElectroPhone(audioContext, {
                spectrum: true,
                updateSpectrum: (dataArray) => this.updateSpectrum(dataArray),
                resetSpectrum: () => this.resetSpectrum()
            });
        }
    }

    componentWillReceiveProps (newProps) {
        if (newProps && newProps.state && newProps.state.modules) {
            this.refreshModules(newProps.state.modules);
            this.refreshLinks(newProps.state.modules);
        }
    }

    render () {
        const { headerHeight, footerHeight, isPianoVisible, isSpectrumVisible, state } = this.props;

        return (
            <div id="synth" style={{ bottom: footerHeight }}>
                <canvas id="spectrum"
                        style={{ top: headerHeight }}
                        className={(!isSpectrumVisible) ? 'closed' : ''}/>

                <div id="keyboard" className={(!isPianoVisible) ? 'closed' : ''}>
                    <PianoKeyNote note={{ key: 65, label: 'A' }}
                                  semiNote={{ key: 87, label: 'W' }}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}
                                  playingVoices={state.playingVoices}
                                  octave={state.octave}/>

                    <PianoKeyNote note={{ key: 83, label: 'S' }}
                                  semiNote={{ key: 69, label: 'E' }}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}
                                  playingVoices={state.playingVoices}
                                  octave={state.octave}/>

                    <PianoKeyNote note={{ key: 68, label: 'D' }}
                                  semiNote={null}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}
                                  playingVoices={state.playingVoices}
                                  octave={state.octave}/>

                    <PianoKeyNote note={{ key: 70, label: 'F' }}
                                  semiNote={{ key: 84, label: 'T' }}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}
                                  playingVoices={state.playingVoices}
                                  octave={state.octave}/>

                    <PianoKeyNote note={{ key: 71, label: 'G' }}
                                  semiNote={{ key: 89, label: 'Y' }}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}
                                  playingVoices={state.playingVoices}
                                  octave={state.octave}/>

                    <PianoKeyNote note={{ key: 72, label: 'H' }}
                                  semiNote={{ key: 85, label: 'U' }}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}
                                  playingVoices={state.playingVoices}
                                  octave={state.octave}/>

                    <PianoKeyNote note={{ key: 74, label: 'J' }}
                                  semiNote={null}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}
                                  playingVoices={state.playingVoices}
                                  octave={state.octave}/>
                </div>

                <GlobalKeys keyboardMapping={this.getKeyboardMapping()}/>
            </div>
        )
    }
}

export default Synth;
