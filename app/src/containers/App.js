import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import * as SynthActions from '../actions/SynthActions';
import WebSynth from 'web-synth';

// Components
import Header from '../components/Header';
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
    headerHeight = 95;

class App extends Component {

    constructor (props) {
        super(props);

        this.audioContext = null;

        if (window && typeof window.AudioContext !== 'undefined') {
            this.audioContext = new window.AudioContext();
        } else if (typeof window.webkitAudioContext !== 'undefined') {
            this.audioContext = new window.webkitAudioContext();
        } else {
            //TODO trigger modal...
        }

        $(document).ready(() => {
            $('[data-toggle="tooltip"]').tooltip();
        });
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
            isMaster: false,
            posX: Math.random() * (this.getGraphHeight()),
            posY: Math.random() * (this.getGraphHeight())
        }));
    }

    updateModule (id, propertyName, propertyValue) {
        const { dispatch } = this.props;
        dispatch(SynthActions.updateNode(id, propertyName, propertyValue));
    }

    getGraphHeight () {
        const
            windowSize = screen.getWindowSize(),
            graphHeight = windowSize.height - headerHeight;

        return graphHeight;
    }

    getGraphWidth () {
        return $('body').width() - 30;
    }

    render () {
        //TODO make view panel in visibility hidden....check for initial width if chang defaultpanel...
        const
            { synth, dispatch } = this.props,
        //refactor and port into viewActions...
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
            viewActions = {
                setViewPanel: (viewPanel) => dispatch(SynthActions.setViewPanel(viewPanel)),
                saveSynth: () => localCache.saveState(localCacheKey, synth),
                loadSynth: () => dispatch(SynthActions.loadState(localCache.loadState(localCacheKey))),
                resetSynth: () => dispatch(SynthActions.resetState()),
                toggleLinkMode: () => dispatch(SynthActions.toggleLinkMode())
            };

        return (
            <div id="main-wrapper" className="container-fluid">
                <Header height={headerHeight}
                        repoUrl={process.env.GITHUB_REPO_URL}
                        viewActions={viewActions}
                        linkMode={synth.graph.linkMode}
                        visiblePanel={synth.viewPanel}
                        libVersion={process.env.LIB_VERSION}/>

                <div id="panel-wrapper" style={{ marginTop: headerHeight }}>
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
                            width={this.getGraphWidth()}
                            height={this.getGraphHeight()}
                            actions={graphActions}
                        />
                    </div>

                    <ControlPanel
                        isVisible={synth.viewPanel === 'control'}
                        modules={synth.modules}
                        updateModule={(id, prop, value) => this.updateModule(id, prop, value)}
                        destroyModule={(id) => dispatch(SynthActions.removeNode(id))}
                    />
                </div>

                <Synth state={synth} audioContext={this.audioContext}/>

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
