import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as SynthActions from '../actions/SynthActions';
//Components
import Graph from '../components/Graph';
import GlobalKeys from '../components/GlobalKeys';
import localCacheService from '../services/localCache';

const localCache = localCacheService();
const localCacheKey = 'webSynth';

class App extends Component {
    getKeyboardMapping () {
        const { synth, dispatch } = this.props;
        return {
            linkMode: {
                down: () => dispatch(SynthActions.setLinkMode(true)),
                up: () => dispatch(SynthActions.setLinkMode(false))
            },
            deleteNodes: () => {
                //TODO pay attention on master...
                const selectedNodes = synth.modules.filter(e => e.isSelected).map(e => e.id);
                return dispatch(SynthActions.removeNodes(selectedNodes));
            },
            note: {
                //TODO manage playing notes in redux...also octave.....
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

    getMaxNodeId () {
        const { synth } = this.props,
            max = synth.modules.reduce((result, e) => {
                const idInt = parseInt(e.id.replace('ele', ''), 10);
                return Math.max(result, idInt);
            }, 0);

        return max + 1;
    }

    addModule () {
        const { dispatch } = this.props;
        dispatch(SynthActions.addAudioNode({ id: 'ele' + this.getMaxNodeId() }));
    }

    render () {
        const
            { synth, dispatch } = this.props,
            graphActions = {
                onClickHandler: (node, isSeletected) => {
                    dispatch(SynthActions.setAudioNodeSelection(node, isSeletected));
                },
                onFreeHandler: (nodeId, nodePosition, graphPan, graphZoom) => {
                    dispatch(SynthActions.setPositions(nodeId, nodePosition, graphPan, graphZoom));
                },
                linkHandler: (sourceNodeId, destNodeId) => {
                    dispatch(SynthActions.linkNodes(sourceNodeId, destNodeId));
                }
            };

        return (
            <div>
                {synth.modules.map(e =>
                    <p key={e.id} onClick={() => dispatch(
                        SynthActions.setAudioNodeSelection(e.id, !e.isSelected)
                    )}>
                        {e.id} - {e.isSelected ? 'V' : 'X'}

                        <button onClick={() => dispatch(
                            SynthActions.removeNode(e.id)
                        )}>
                            delete
                        </button>
                    </p>
                )}
                <button onClick={() => this.addModule()}>
                    add
                </button>
                <button onClick={() => dispatch(SynthActions.toggleLinkMode())}>
                    LINK MODE
                </button>
                |
                <button onClick={() => localCache.saveState(localCacheKey, synth)}>
                    SAVE SYNTH
                </button>
                <button onClick={() => dispatch(SynthActions.loadState(localCache.loadState(localCacheKey)))}>
                    LOAD SYNTH
                </button>
                <button onClick={() => dispatch(SynthActions.resetState())}>
                    RESET SYNTH
                </button>
                <Graph graphState={synth}
                       actions={graphActions}
                />
                <GlobalKeys keyboardMapping={this.getKeyboardMapping()}/>
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
