import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import * as SynthActions from '../actions/SynthActions';
import WebSynth from 'web-synth';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
import Synth from '../components/Synth';
import GlobalKeys from '../components/GlobalKeys';

//Panels
import ControlPanel from '../components/ControlPanel';
import GraphPanel from '../components/Graph/GraphPanel';

// Services
import localCacheService from '../services/localCache';
import screenService from '../services/screen';

const
    localCache = localCacheService(),
    screen = screenService(),
    localCacheKey = 'webSynth',
    nodePrefix = 'node',
    synthModules = WebSynth.describeModules(),
    headerHeight = 94,
    footerHeight = 40;

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
            $("#main-wrapper").find('li.module-builder').on('show.bs.dropdown', () => {
                $("#main-wrapper").find('li.module-builder').find('a.dropdown-toggle').addClass('selected');
            });
            $("#main-wrapper").find('li.module-builder').on('hidden.bs.dropdown', () => {
                $("#main-wrapper").find('li.module-builder').find('a.dropdown-toggle').removeClass('selected');
            });
        });
    }

    removeSelectedNodes () {
        const
            { synth, dispatch } = this.props,
            selectedNodes = synth.modules.filter(e => e.isSelected && !e.isMaster).map(e => e.id);

        if (selectedNodes.length > 0) {
            dispatch(SynthActions.removeNodes(selectedNodes));
        }
    }

    getKeyboardMapping () {
        const { dispatch, synth } = this.props;

        return [
            {
                keys: [16], //SHIFT
                down: () => dispatch(SynthActions.setLinkMode(true)),
                up: () => dispatch(SynthActions.setLinkMode(false)),
                specialKeys: 'shift'
            },
            {
                keys: [9], //TAB
                down: (e) => {
                    e.preventDefault();

                    let toggleView = '';

                    if (synth.viewPanel === 'graph') {
                        toggleView = 'control';
                    } else if (synth.viewPanel === 'control') {
                        toggleView = 'graph';
                    }
                    dispatch(SynthActions.setViewPanel(toggleView));
                },
                up: () => false
            },
            {
                keys: [90], //Z
                down: () => dispatch(SynthActions.octaveDecrease()),
                up: () => false,
                specialKeys: false
            },
            {
                keys: [88], //X
                down: () => dispatch(SynthActions.octaveIncrease()),
                up: () => false,
                specialKeys: false
            },
            {
                keys: [8], //DELETE
                down: (e) => e.preventDefault(),
                up: () => this.removeSelectedNodes(),
                specialKeys: false
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

    getNormalizedValue (id, propertyName, propertyValue) {
        //TODO move this method logic in the reducer
        const module = this.props.synth.modules
                           .filter(e => e.id === id)
                           .pop();
        let result,
            property,
            step = 1;

        if (module) {
            property = module.properties.filter(prop => prop.name === propertyName).pop();

            if (property && property.type === 'number' && property.step) {
                step = property.step;
                result =
                    Math.round(((~~ (((propertyValue < 0) ? -0.5 : 0.5) + (propertyValue / step))) * step) * 100) / 100;
            } else {
                result = propertyValue;
            }
        }

        return result;
    }

    updateModule (id, propertyName, propertyValue) {
        const
            { dispatch } = this.props,
            normalizedPropertyValue = this.getNormalizedValue(id, propertyName, propertyValue);

        dispatch(SynthActions.updateNode(id, propertyName, normalizedPropertyValue));
    }

    getGraphHeight () {
        const
            windowSize = screen.getWindowSize(),
            graphHeight = windowSize.height - headerHeight - footerHeight;

        return graphHeight;
    }

    getGraphWidth () {
        return $('body').width() - 30;
    }

    render () {
        const
            { synth, dispatch } = this.props,
        //TODO refactor and port into viewActions...
            graphActions = {
                onClickHandler: (node, isSeletected) => {
                    if (node !== WebSynth.CONST.MASTER) {
                        dispatch(SynthActions.setAudioNodeSelection(node, isSeletected));
                    }
                },
                onFreeHandler: (nodeId, nodePosition, graphPan, graphZoom) => {
                    dispatch(SynthActions.setPositions(nodeId, nodePosition, graphPan, graphZoom));
                },
                linkHandler: (sourceNodeId, destNodeId) => {
                    dispatch(SynthActions.linkNodes(sourceNodeId, destNodeId));
                }
            },
            viewActions = {
                setViewPanel: (viewPanel) =>
                    dispatch(SynthActions.setViewPanel(viewPanel)),
                setPianoVisibility: (isPianoVisible) =>
                    dispatch(SynthActions.setPianoVisibility(isPianoVisible)),
                setSpectrumVisibility: (isSpectrumVisible) =>
                    dispatch(SynthActions.setSpectrumVisibility(isSpectrumVisible)),
                saveSynth: () =>
                    localCache.saveState(localCacheKey, synth),
                loadSynth: () =>
                    dispatch(SynthActions.loadState(
                        localCache.loadState(localCacheKey),
                        WebSynth.describeModules().map(e => e.type)
                    )),
                resetSynth: () =>
                    dispatch(SynthActions.resetState()),
                toggleLinkMode: () =>
                    dispatch(SynthActions.toggleLinkMode()),
                addModule: (type) =>
                    this.addModule(type),
                deleteSelectedNodes: () =>
                    this.removeSelectedNodes(),
                octaveDecrease: () =>
                    dispatch(SynthActions.octaveDecrease()),
                octaveIncrease: () =>
                    dispatch(SynthActions.octaveIncrease())
            },
            footerMarginBottom = (synth.isPianoVisible) ? 8 : 2;

        return (
            <div id="main-wrapper" className="container-fluid">
                <Header height={headerHeight}
                        repoUrl={process.env.GITHUB_REPO_URL}
                        viewActions={viewActions}
                        linkMode={synth.graph.linkMode}
                        visiblePanel={synth.viewPanel}
                        synthModules={synthModules.filter(e => e.type !== WebSynth.TYPES.MASTER)}
                        numSelectedNodes={synth.modules.filter(e => e.isSelected === true).length}
                        libVersion={process.env.LIB_VERSION}
                />

                <div id="panel-wrapper"
                     style={{ marginTop: headerHeight, marginBottom: footerHeight * footerMarginBottom }}>
                    <GraphPanel
                        isVisible={synth.viewPanel === 'graph'}
                        synth={synth}
                        graphWidth={this.getGraphWidth()}
                        graphHeight={this.getGraphHeight()}
                        viewActions={graphActions}
                    />
                    <ControlPanel
                        isVisible={synth.viewPanel === 'control'}
                        modules={synth.modules}
                        updateModule={(id, prop, value) => this.updateModule(id, prop, value)}
                        destroyModule={(id) => dispatch(SynthActions.removeNode(id))}
                    />
                </div>

                <Synth state={synth}
                       audioContext={this.audioContext}
                       footerHeight={footerHeight}
                       headerHeight={headerHeight}
                       isPianoVisible={synth.isPianoVisible}
                       isSpectrumVisible={synth.isSpectrumVisible}
                       updatePlayingVoices={playingVoices => dispatch(SynthActions.updatePlayingVoices(playingVoices))}
                />

                <GlobalKeys keyboardMapping={this.getKeyboardMapping()}/>

                <Footer height={footerHeight}
                        viewActions={viewActions}
                        octave={synth.octave}
                        isPianoVisible={synth.isPianoVisible}
                        isSpectrumVisible={synth.isSpectrumVisible}
                />
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
