import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as SynthActions from '../actions/SynthActions';
import WebSynth from 'web-synth';

// Components
import Graph from '../components/Graph';
import Synth from '../components/Synth';
import GlobalKeys from '../components/GlobalKeys';

//Panels
import ControlPanel from '../components/ControlPanel';

// Services
import localCacheService from '../services/localCache';
import screenService from '../services/screen';

const
    localCache = localCacheService(),
    screen = screenService(),
    localCacheKey = 'webSynth',
    nodePrefix = 'node',
    synthModules = WebSynth.describeModules(),
    headerHeight = 100,
    audioCtx = window.AudioContext || window.webkitAudioContext;

class App extends Component {

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
                return isNaN(idInt) ? 0 : Math.max(result, idInt);
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
            },
            libVersion = process.env.LIB_VERSION;

        return (
            <div>
                <div id="header" style={{ height: headerHeight, padding: '5px' }} className="row">
                    <div className="col-xs-8">
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
                    <div className="col-xs-4">
                        <div className="pull-right">WebSynth v.{libVersion}</div>
                    </div>
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
                    <Graph
                        state={synth}
                        height={this.getGraphHeight()}
                        actions={graphActions}
                    />
                </div>

                <ControlPanel
                    isVisible={synth.viewPanel === 'control'}
                    modules={synth.modules}
                />

                <Synth state={synth} audioContext={audioCtx} />

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
