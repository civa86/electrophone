import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as SynthActions from '../actions/SynthActions';
import WebSynth from 'web-synth';

// Components
import Graph from '../components/Graph';
import Synth from '../components/Synth';
import GlobalKeys from '../components/GlobalKeys';

// Services
import localCacheService from '../services/localCache';
import screenService from '../services/screen';

const
    localCache = localCacheService(),
    screen = screenService(),
    localCacheKey = 'webSynth',
    nodePrefix = 'node',
    synthModules = WebSynth.describeModules(),
    headerHeight = 70;

class App extends Component {
    createMasterNode () {
        const { dispatch } = this.props;
        dispatch(SynthActions.addAudioNode(
            {
                id: nodePrefix + '0',
                isMaster: true
            }
        ));
    }

    getKeyboardMapping () {
        const { synth, dispatch } = this.props;

        return [
            {
                keys: [16], //SHIFT
                down: () => dispatch(SynthActions.setLinkMode(true)),
                up: () => dispatch(SynthActions.setLinkMode(false))
            },
            {
                keys: [90], //Z
                down: () => dispatch(SynthActions.octaveDecrease()),
                up: () => false
            },
            {
                keys: [88], //X
                down: () => dispatch(SynthActions.octaveIncrease()),
                up: () => false
            },
            {
                keys: [8], //DELETE
                down: (e) => e.preventDefault(),
                up: () => {
                    const selectedNodes = synth.modules.filter(e => e.isSelected && !e.isMaster).map(e => e.id);
                    if (selectedNodes.length > 0) {
                        dispatch(SynthActions.removeNodes(selectedNodes));
                    }

                }
            }
        ]
    }

    getMaxNodeId () {
        const
            { synth } = this.props,
            max = synth.modules.reduce((result, e) => {
                const idInt = parseInt(e.id.replace(nodePrefix, ''), 10);
                return Math.max(result, idInt);
            }, 0);

        return max + 1;
    }

    addModule (type) {
        const
            { dispatch } = this.props,
            newModule = synthModules.filter(e => e.type === type).pop();

        dispatch(SynthActions.addAudioNode({
            ...newModule,
            id: nodePrefix + this.getMaxNodeId(),
            isMaster: false
        }));
    }

    getGraphHeight () {
        const
            windowSize = screen.getWindowSize(),
            graphHeight = windowSize.height - headerHeight;
        return graphHeight;
    }

    //componentDidMount () {
    //    //const { synth } = this.props;
    //    //let master = synth.modules.filter(e => e.isMaster).pop();
    //    //if (!master) {
    //    //    this.createMasterNode();
    //    //}
    //}

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
                <div id="header" style={{ height: headerHeight }}>
                    <button onClick={() => dispatch(SynthActions.toggleLinkMode())}>
                        LINK MODE
                    </button>
                    <button onClick={() => localCache.saveState(localCacheKey, synth)}>
                        SAVE SYNTH
                    </button>
                    <button onClick={() => dispatch(SynthActions.loadState(localCache.loadState(localCacheKey)))}>
                        LOAD SYNTH
                    </button>
                    <button onClick={() => dispatch(SynthActions.resetState())}>
                        RESET SYNTH
                    </button>
                    <br/>
                    OCTAVE: {synth.octave}
                    <br/>
                    <button onClick={() => dispatch(SynthActions.setViewPanel('add'))}>
                        ADD MODULE
                    </button>

                    <button onClick={() => dispatch(SynthActions.setViewPanel('graph'))}>
                        GRAPH PANEL
                    </button>

                    <button onClick={() => dispatch(SynthActions.setViewPanel('control'))}>
                        CONTROL PANEL
                    </button>

                </div>
                <div id="add-panel" style={{ display: (synth.viewPanel === 'add') ? 'block' : 'none' }}>
                    {synthModules.map(e => {
                        if (e.type !== WebSynth.TYPES.MASTER) {
                            return <button key={e.type} onClick={() => this.addModule(e.type)}>
                                {e.type}
                            </button>
                        }
                    })}
                </div>

                <div id="graph-panel" style={{ display: (synth.viewPanel === 'graph') ? 'block' : 'none' }}>
                    <Graph state={synth}
                           height={this.getGraphHeight()}
                           actions={graphActions}
                    />
                </div>
                <div id="control-panel" style={{ display: (synth.viewPanel === 'control') ? 'block' : 'none' }}>
                    {synth.modules.map(e =>
                        <p key={e.id} onClick={() => dispatch(SynthActions.setAudioNodeSelection(e.id, !e.isSelected))}>
                            {e.id} - {e.isSelected ? 'V' : 'X'}

                            {(() => {
                                if (!e.isMaster) {
                                    return <button onClick={
                                        () => dispatch(SynthActions.removeNode(e.id))
                                    }>delete</button>
                                }

                            })()}
                        </p>
                    )}
                </div>
                <Synth state={synth} />
                <GlobalKeys keyboardMapping={this.getKeyboardMapping()}/>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        synth: state.synth
    };
}

export default connect(mapStateToProps)(App);
