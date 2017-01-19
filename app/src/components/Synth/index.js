import React, { Component } from 'react';
import $ from 'jquery';

import WebSynth from 'web-synth';
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
            sliceWidth = this.spectrumProps.WIDTH * 1.0 / k;
        let x = 0;

        this.spectrumProps.canvasCtx.fillStyle = 'rgb(51, 51, 51)';
        this.spectrumProps.canvasCtx.fillRect(0, 0, this.spectrumProps.WIDTH, this.spectrumProps.HEIGHT);
        this.spectrumProps.canvasCtx.lineWidth = 1.8;
        this.spectrumProps.canvasCtx.strokeStyle = 'rgb(70, 188, 236)';
        this.spectrumProps.canvasCtx.beginPath();

        for (let i = 0; i < dataArray.length; i++) {
            const v = dataArray[i] / k,
                y = this.spectrumProps.HEIGHT - (v * this.spectrumProps.HEIGHT);

            if (i === 0) {
                this.spectrumProps.canvasCtx.moveTo(x, y);
            } else {
                this.spectrumProps.canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }
        // for (let i = 0; i < dataArray.length; i++) {
        //     let value = dataArray[i],
        //         percent = value / 256,
        //         height = this.spectrumProps.HEIGHT * percent,
        //         offset = this.spectrumProps.HEIGHT - height - 1,
        //         barWidth = this.spectrumProps.WIDTH / dataArray.length,
        //         hue = i / dataArray.length * 360;
        //     this.spectrumProps.canvasCtx.fillStyle = 'hsl(' + hue + ', 90%, 50%)';
        //     this.spectrumProps.canvasCtx.fillRect(i * barWidth, offset, barWidth, height);
        // }

        this.spectrumProps.canvasCtx.stroke();
    }

    resetSpectrum () {
        this.spectrumProps.canvasCtx.clearRect(0, 0, this.spectrumProps.WIDTH, this.spectrumProps.HEIGHT);
    }

    playNoteFromKey (event, key) {
        const { state, updatePlayingVoices } = this.props;

        if (event && typeof event.stopPropagation === 'function') {
            event.stopPropagation();
        }

        if (noteMapping[key]) {
            this.synth.play(
                WebSynth.getFrequency(noteMapping[key], state.octave)
            );

            if (typeof updatePlayingVoices === 'function') {
                const voiceLabel = key + '-' + state.octave;

                if (state.playingVoices.indexOf(voiceLabel) === -1) {
                    updatePlayingVoices([...state.playingVoices, voiceLabel]);
                }
            }
        }
    }

    stopNoteFromKey (event, key) {
        const { state, updatePlayingVoices } = this.props;

        if (event && typeof event.stopPropagation === 'function') {
            event.stopPropagation();
        }

        if (noteMapping[key]) {
            this.synth.stop(
                WebSynth.getFrequency(noteMapping[key], state.octave)
            );

            if (typeof updatePlayingVoices === 'function') {
                const voiceLabel = key + '-' + state.octave;
                updatePlayingVoices(state.playingVoices.filter(e => e !== voiceLabel));
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

    componentDidMount () {
        const
            { audioContext } = this.props,
            spectrumCanvasCtxElement = document.getElementById('spectrum');

        this.spectrumProps = {
            canvasCtx: spectrumCanvasCtxElement.getContext('2d'),
            WIDTH: $(window).width(), //TODO pay attention if ypu want to manage window resize event
            HEIGHT: 200
        };

        this.resetSpectrum();

        if (audioContext) {
            this.synth = new WebSynth(audioContext, {
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
                    <PianoKeyNote note={{ key: 65, label: 'C' }}
                                  semiNote={{ key: 87, label: 'C#' }}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}
                                  playingVoices={state.playingVoices}
                                  octave={state.octave}/>

                    <PianoKeyNote note={{ key: 83, label: 'D' }}
                                  semiNote={{ key: 69, label: 'D#' }}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}
                                  playingVoices={state.playingVoices}
                                  octave={state.octave}/>

                    <PianoKeyNote note={{ key: 68, label: 'E' }}
                                  semiNote={null}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}
                                  playingVoices={state.playingVoices}
                                  octave={state.octave}/>

                    <PianoKeyNote note={{ key: 70, label: 'F' }}
                                  semiNote={{ key: 84, label: 'F#' }}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}
                                  playingVoices={state.playingVoices}
                                  octave={state.octave}/>

                    <PianoKeyNote note={{ key: 71, label: 'G' }}
                                  semiNote={{ key: 89, label: 'G#' }}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}
                                  playingVoices={state.playingVoices}
                                  octave={state.octave}/>

                    <PianoKeyNote note={{ key: 72, label: 'A' }}
                                  semiNote={{ key: 85, label: 'A#' }}
                                  playNoteHandler={(e, key) => this.playNoteFromKey(e, key)}
                                  stopNoteHandler={(e, key) => this.stopNoteFromKey(e, key)}
                                  playingVoices={state.playingVoices}
                                  octave={state.octave}/>

                    <PianoKeyNote note={{ key: 74, label: 'B' }}
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
