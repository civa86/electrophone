import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import $ from 'jquery';

import * as AppActions from '../actions/AppActions';
import * as UiActions from '../actions/UiActions';
import * as SynthActions from '../actions/SynthActions';
import WebSynth from 'web-synth';

// Components
import NoAudioWarning from '../components/NoAudioWarning';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Synth from '../components/Synth';
import GlobalKeys from '../components/GlobalKeys';
import SaveModal from '../components/Operations/SaveModal';
import LoadModal from '../components/Operations/LoadModal';

//Panels
import ControlPanel from '../components/ControlPanel';
import GraphPanel from '../components/Graph';

// Services
import localCacheService from '../services/localCache';
import screenService from '../services/screen';

const
    storage = (typeof(Storage) !== 'undefined' && window.localStorage) ? window.localStorage : null,
    localCache = localCacheService(storage),
    screen = screenService(),
    localCacheKey = 'webSynth',
    nodePrefix = 'node',
    synthModules = WebSynth.describeModules(),
    headerHeight = 94,
    footerHeight = 40,
    Actions = { ...AppActions, ...UiActions, ...SynthActions };

class App extends Component {

    constructor (props) {
        super(props);

        this.audioContext = null;

        if (window && typeof window.AudioContext !== 'undefined') {
            this.audioContext = new window.AudioContext();
        } else if (typeof window.webkitAudioContext !== 'undefined') {
            this.audioContext = new window.webkitAudioContext();
        } else {
            //No Audio Warning
            $(document).ready(() => {
                $('#no-audio-warning').modal({
                    backdrop: 'static'
                });
                $('#no-audio-warning').modal('show');
            });
        }
    }

    componentDidMount () {
        const
            { dispatch } = this.props,
            savedList = localCache.itemsList(localCacheKey);

        dispatch(AppActions.updateSavedList(savedList));

        $(document).ready(() => {
            //Tooltips
            $('[data-toggle="tooltip"]').tooltip();

            //Add module dropdown
            $('#main-wrapper').find('li.module-builder').on('show.bs.dropdown', () => {
                $('#main-wrapper').find('li.module-builder').find('a.dropdown-toggle').addClass('selected');
            });
            $('#main-wrapper').find('li.module-builder').on('hidden.bs.dropdown', () => {
                $('#main-wrapper').find('li.module-builder').find('a.dropdown-toggle').removeClass('selected');
            });

            //Operation Modals
            $('.operation-modal').on('hidden.bs.modal', () => {
                $('.operation-modal').find('.confirm-operation').hide();
                dispatch(reset('saveSynth'));
            });
        });
    }

    isOperationInProgress () {
        return $('.modal.in').length > 0;
    }

    dispatchIfNotInOperation (action) {
        const { dispatch } = this.props;
        if (!this.isOperationInProgress()) {
            return dispatch(action);
        }
    }

    getViewActions () {
        //TODO write a component dedicated???
        const { dispatch, ui, synth } = this.props;
        return {
            onGraphCreated: (instance) => {
                dispatch(Actions.setGraphInstance(instance));
            },
            onClickHandler: (node, isSeletected) => {
                if (node !== WebSynth.CONST.MASTER) {
                    dispatch(Actions.setNodeSelection(node, isSeletected));
                }
            },
            onFreeHandler: (nodeId, nodePosition, graphPan, graphZoom) => {
                dispatch(Actions.setPositions(nodeId, nodePosition, graphPan, graphZoom));
            },
            linkHandler: (sourceNodeId, destNodeId) => {
                dispatch(Actions.linkNodes(sourceNodeId, destNodeId));
            },
            setViewPanel: (viewPanel) =>
                dispatch(Actions.setViewPanel(viewPanel)),
            setPianoVisibility: (isPianoVisible) =>
                dispatch(Actions.setPianoVisibility(isPianoVisible)),
            setSpectrumVisibility: (isSpectrumVisible) =>
                dispatch(Actions.setSpectrumVisibility(isSpectrumVisible)),
            openSaveOperation: () => {
                $('#save-operation').modal('show');
            },
            openLoadOperation: () => {
                $('#load-operation').modal('show');
            },
            saveSynth: values => {
                const
                    newUi = { ...ui, graph: { ...ui.graph, instance: null } },
                    newSavedList = localCache.addItem(
                        localCacheKey,
                        values.label,
                        { ui: { ...newUi }, synth: { ...synth } }
                    );

                $('.save-new-form').find('input[name="label"]').blur();

                dispatch(reset('saveSynth'));
                dispatch(AppActions.updateSavedList(newSavedList));
            },
            removedSavedSynth: id => {
                const newSavedList = localCache.removeItem(localCacheKey, id);
                dispatch(AppActions.updateSavedList(newSavedList));
            },
            updateSavedSynth: id => {
                const
                    newUi = { ...ui, graph: { ...ui.graph, instance: null } },
                    newSavedList = localCache.updateItem(
                        localCacheKey,
                        id,
                        { ui: { ...newUi }, synth: { ...synth } }
                    );
                dispatch(AppActions.updateSavedList(newSavedList));
            },
            loadSynth: id => {
                const item = localCache.getItem(localCacheKey, id);

                $('#load-operation').modal('hide');
                dispatch(Actions.loadState(item.item, WebSynth.describeModules().map(e => e.type)));
            },
            resetSynth: () =>
                dispatch(Actions.resetState()),
            toggleLinkMode: () =>
                dispatch(Actions.toggleLinkMode()),
            addModule: (type) =>
                this.addModule(type),
            deleteSelectedNodes: () =>
                this.removeSelectedNodes(),
            octaveDecrease: () =>
                dispatch(Actions.octaveDecrease()),
            octaveIncrease: () =>
                dispatch(Actions.octaveIncrease())
        }
    }

    removeSelectedNodes () {
        const
            { synth, dispatch } = this.props,
            selectedNodes = synth.modules.filter(e => e.isSelected && !e.isMaster).map(e => e.id);

        if (selectedNodes.length > 0) {
            dispatch(Actions.removeNodes(selectedNodes));
        }
    }

    getKeyboardMapping () {
        const { ui } = this.props;

        return [
            {
                keys: [16], //SHIFT
                down: () => this.dispatchIfNotInOperation(Actions.setLinkMode(true)),
                up: () => this.dispatchIfNotInOperation(Actions.setLinkMode(false)),
                specialKeys: 'shift'
            },
            {
                keys: [9], //TAB
                down: (e) => {
                    e.preventDefault();

                    let toggleView = '';

                    if (ui.viewPanel === 'graph') {
                        toggleView = 'control';
                    } else if (ui.viewPanel === 'control') {
                        toggleView = 'graph';
                    }
                    this.dispatchIfNotInOperation(Actions.setViewPanel(toggleView));
                },
                up: () => false
            },
            {
                keys: [90], //Z
                down: () => this.dispatchIfNotInOperation(Actions.octaveDecrease()),
                up: () => false,
                specialKeys: false
            },
            {
                keys: [88], //X
                down: () => this.dispatchIfNotInOperation(Actions.octaveIncrease()),
                up: () => false,
                specialKeys: false
            },
            {
                keys: [8], //DELETE
                down: (e) => {
                    if (!this.isOperationInProgress()) {
                        e.preventDefault()
                    }
                },
                up: () => {
                    if (!this.isOperationInProgress()) {
                        this.removeSelectedNodes();
                    }
                },
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
            { dispatch, ui } = this.props,
            newModule = synthModules.filter(e => e.type === type).pop();

        dispatch(Actions.addNode(
            {
                ...newModule,
                id: nodePrefix + this.getMaxNodeId(),
                isMaster: false,
                posX: Math.random() * (this.getGraphHeight()),
                posY: Math.random() * (this.getGraphHeight())
            },
            {
                zoom: ui.graph.instance.zoom(),
                pan: ui.graph.instance.pan()
            }
        ));
    }

    updateModule (id, propertyName, propertyValue) {
        const { dispatch } = this.props;
        dispatch(Actions.updateNode(id, propertyName, propertyValue));
    }

    getGraphHeight () {
        const
            windowSize = screen.getWindowSize(),
            graphHeight = windowSize.height - headerHeight - footerHeight - 30;

        return graphHeight;
    }

    getGraphWidth () {
        return $('body').width() - 30;
    }

    render () {
        const
            { app, ui, synth, dispatch } = this.props,
            viewActions = this.getViewActions();

        return (
            <div id="main-wrapper" className="container-fluid">
                <NoAudioWarning/>
                <SaveModal items={app.savedList}
                           saveAction={viewActions.saveSynth}
                           updateAction={viewActions.updateSavedSynth}
                           removeAction={viewActions.removedSavedSynth}
                />
                <LoadModal items={app.savedList}
                           loadAction={viewActions.loadSynth}
                           removeAction={viewActions.removedSavedSynth}
                />
                <Header height={headerHeight}
                        repoUrl={process.env.GITHUB_REPO_URL}
                        viewActions={viewActions}
                        linkMode={ui.graph.linkMode}
                        visiblePanel={ui.viewPanel}
                        synthModules={synthModules.filter(e => e.type !== WebSynth.TYPES.MASTER)}
                        numSelectedNodes={synth.modules.filter(e => e.isSelected === true).length}
                        libVersion={process.env.LIB_VERSION}
                />

                <div id="panel-wrapper"
                     style={{ marginTop: headerHeight }}>
                    <GraphPanel
                        isVisible={ui.viewPanel === 'graph'}
                        synth={synth}
                        ui={ui}
                        graphWidth={this.getGraphWidth()}
                        graphHeight={this.getGraphHeight()}
                        viewActions={viewActions}
                    />
                    <ControlPanel
                        isVisible={ui.viewPanel === 'control'}
                        modules={synth.modules}
                        updateModule={(id, prop, value) => this.updateModule(id, prop, value)}
                        destroyModule={(id) => dispatch(Actions.removeNode(id))}
                    />
                </div>

                <Synth state={synth}
                       audioContext={this.audioContext}
                       footerHeight={footerHeight}
                       headerHeight={headerHeight}
                       isPianoVisible={ui.isPianoVisible}
                       isSpectrumVisible={ui.isSpectrumVisible}
                       updatePlayingVoices={playingVoices => this.dispatchIfNotInOperation(
                                                                Actions.updatePlayingVoices(
                                                                    playingVoices,
                                                                    {
                                                                        zoom: ui.graph.instance.zoom(),
                                                                        pan: ui.graph.instance.pan()
                                                                    }
                                                                ))}
                />

                <GlobalKeys keyboardMapping={this.getKeyboardMapping()}/>

                <Footer height={footerHeight}
                        viewActions={viewActions}
                        octave={synth.octave}
                        isPianoVisible={ui.isPianoVisible}
                        isSpectrumVisible={ui.isSpectrumVisible}
                />
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        app: state.app,
        synth: state.synth,
        ui: state.ui
    };
}

export default connect(mapStateToProps)(App);
