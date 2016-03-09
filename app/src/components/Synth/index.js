import React, { Component } from 'react';
//TODO check...you are importing web-synth source code...try with dist version!
import WebSynth from 'web-synth';
import GlobalKeys from '../GlobalKeys';

//TODO check for spectrum and others init props of synth....pass them from App!!
//TODO wrtie a synth maanger?
const
    synth = new WebSynth(),
    noteMapping = {
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

    //componentDidMount () {
    //    console.log(synth.getModules());
    //}

    componentWillReceiveProps (newProps) {
        console.log('synth component', newProps.state);
    }

    getKeyboardMapping () {
        const { state } = this.props;
        return [
            {
                keys: Object.keys(noteMapping).map(Number),
                down: (event, key) => {
                    if (noteMapping[key]) {
                        synth.play(
                            WebSynth.getFrequency(noteMapping[key], state.octave)
                        );
                    }
                },
                up: (event, key) => {
                    if (noteMapping[key]) {
                        synth.stop(
                            WebSynth.getFrequency(noteMapping[key], state.octave)
                        );
                    }
                }
            }
        ]
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
