import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SynthActions from '../actions/SynthActions';
//Components
import Graph from '../components/Graph';
import GlobalKeys from '../components/GlobalKeys';

class App extends Component {
    getKeyboardMapping () {
        const { dispatch } = this.props;
        return {
            linkMode: {
                down: () => dispatch(SynthActions.setLinkMode(true)),
                up: () => dispatch(SynthActions.setLinkMode(false))
            },
            note: {
                //TODO manage playing notes in redux...also octave......
                down: (note) => console.log('play', note),
                up: (note) => console.log('stop', note)
            },
            //TODO octave...z x etc...
            notes: {
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
            }
        };
    }

    render () {
        const
            { synth, dispatch } = this.props,
            graphActions = {
                onClickHandler: (node, isSeletected) => {
                    return dispatch(SynthActions.setAudioNodeSelection(node, isSeletected));
                },
                onFreeHandler: (nodeId, nodePosition, graphPosition) => {
                    return dispatch(SynthActions.setPositions(nodeId, nodePosition, graphPosition));
                }
            };

        return (
            <div>
                {synth.modules.map(e =>
                    <p key={e.id} onClick={() => dispatch(
                        SynthActions.setAudioNodeSelection(e.id, !e.isSelected)
                    )}>
                        {e.id} - {e.isSelected ? 'V' : 'X'}
                    </p>
                )}
                <button onClick={() => dispatch(
                    SynthActions.addAudioNode({ id: 'ele' + synth.modules.length })
                )}>
                    add
                </button>
                <button onClick={() => dispatch(SynthActions.toggleLinkMode())}>
                    LINK MODE
                </button>
                <Graph modules={synth.modules}
                       linkMode={synth.linkMode}
                       actions={graphActions}
                />
                <GlobalKeys keyboardMapping={this.getKeyboardMapping()} />
            </div>
        );
    }
}

function select (state) {
    return {
        synth: state.synth
    };
}

export default connect(select)(App);
