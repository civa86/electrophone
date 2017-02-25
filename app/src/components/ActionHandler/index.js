import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import $ from 'jquery';
import WebSynth from 'web-synth';

import * as AppActions from '../../actions/AppActions';
import * as UiActions from '../../actions/UiActions';
import * as SynthActions from '../../actions/SynthActions';

// Services
import localCacheService from '../../services/localCache';
import * as screenService from '../../services/screen';

function ActionHandler (WrappedComponent) {
    const
        storage = (typeof(Storage) !== 'undefined' && window.localStorage) ? window.localStorage : null,
        localCache = localCacheService(storage);

    class ActionHandlerClass extends Component {

        constructor (props) {
            super(props);
        }

        resetApplication () {
            const { dispatch } = this.props;
            dispatch(AppActions.resetState())
        }

        openSaveModal () {
            $('#save-operation').modal('show');
        }

        openLoadModal () {
            $('#load-operation').modal('show');
        }

        toggleLinkMode () {
            const { dispatch } = this.props;
            dispatch(UiActions.toggleLinkMode());
        }

        addSynthModule (type) {
            const
                { dispatch, ui } = this.props,
                nodePrefix = 'node',
                modulesList = WebSynth.describeModules(),
                newModule = modulesList.filter(e => e.type === type).pop(),
                maxNodeId = this.props.synth.modules.reduce((result, e) => {
                    const idInt = parseInt(e.id.replace(nodePrefix, ''), 10);
                    return isNaN(idInt) ? 0 : Math.max(result, idInt);
                }, 0);

            dispatch(SynthActions.addNode(
                {
                    ...newModule,
                    id: nodePrefix + (maxNodeId + 1),
                    isMaster: false,
                    posX: Math.random() * (screenService.getGraphHeight()),
                    posY: Math.random() * (screenService.getGraphHeight())
                },
                {
                    zoom: ui.graph.instance.zoom(),
                    pan: ui.graph.instance.pan()
                }
            ));
        }

        deleteSynthSelectedNodes () {
            const
                { dispatch } = this.props,
                selectedNodes = this.props.synth.modules.filter(e => e.isSelected && !e.isMaster).map(e => e.id);

            if (selectedNodes.length > 0) {
                dispatch(SynthActions.removeNodes(selectedNodes));
            }
        }

        setViewPanel (viewPanel) {
            const { dispatch } = this.props;
            dispatch(UiActions.setViewPanel(viewPanel))
        }

        saveSynth (values, localCacheKey) {
            const
                { dispatch } = this.props,
                newUi = { ...this.props.ui, graph: { ...this.props.ui.graph, instance: null } },
                newSavedList = localCache.addItem(
                    localCacheKey,
                    values.label,
                    { ui: { ...newUi }, synth: { ...this.props.synth } }
                );

            $('.save-new-form').find('input[name="label"]').blur();

            dispatch(reset('saveSynth'));
            dispatch(AppActions.updateSavedList(newSavedList));
        }

        updateSavedSynth (id, localCacheKey) {
            const
                { dispatch } = this.props,
                newUi = { ...this.props.ui, graph: { ...this.props.ui.graph, instance: null } },
                newSavedList = localCache.updateItem(
                    localCacheKey,
                    id,
                    { ui: { ...newUi }, synth: { ...this.props.synth } }
                );
            dispatch(AppActions.updateSavedList(newSavedList));
        }

        removedSavedSynth (id, localCacheKey) {
            const
                { dispatch } = this.props,
                newSavedList = localCache.removeItem(localCacheKey, id);
            dispatch(AppActions.updateSavedList(newSavedList));
        }

        loadSynth (id, localCacheKey) {
            const
                { dispatch } = this.props,
                item = localCache.getItem(localCacheKey, id);

            $('.modal').modal('hide');
            dispatch(AppActions.loadState(item.item, WebSynth.describeModules().map(e => e.type)));
        }

        onGraphCreated (instance) {
            const { dispatch } = this.props;
            dispatch(UiActions.setGraphInstance(instance));
        }

        onClickHandler (node, isSelected) {
            const { dispatch } = this.props;
            if (node !== WebSynth.CONST.MASTER) {
                dispatch(SynthActions.setNodeSelection(node, isSelected));
            }
        }

        onFreeHandler (nodeId, nodePosition, graphPan, graphZoom) {
            const { dispatch } = this.props;
            dispatch(SynthActions.setPositions(nodeId, nodePosition, graphPan, graphZoom));
        }

        linkHandler (sourceNodeId, destNodeId) {
            const { dispatch } = this.props;
            dispatch(SynthActions.linkNodes(sourceNodeId, destNodeId))
        }

        octaveDecrease () {
            const { dispatch } = this.props;
            dispatch(SynthActions.octaveDecrease());
        }

        octaveIncrease () {
            const { dispatch } = this.props;
            dispatch(SynthActions.octaveIncrease());
        }

        setPianoVisibility (isPianoVisible) {
            const { dispatch } = this.props;
            dispatch(UiActions.setPianoVisibility(isPianoVisible));
        }

        setSpectrumVisibility (isSpectrumVisible) {
            const { dispatch } = this.props;
            dispatch(UiActions.setSpectrumVisibility(isSpectrumVisible));
        }

        render () {
            return <WrappedComponent {...this.props}
                actions={{
                    resetApplication: () => this.resetApplication(),

                    openSaveModal: () => this.openSaveModal(),

                    openLoadModal: () => this.openLoadModal(),

                    addSynthModule: (type) => this.addSynthModule(type),

                    toggleLinkMode: () => this.toggleLinkMode(),

                    deleteSynthSelectedNodes: () => this.deleteSynthSelectedNodes(),

                    setViewPanel: (viewPanel) => this.setViewPanel(viewPanel),

                    saveSynth: (values, localCacheKey) => this.saveSynth(values, localCacheKey),

                    updateSavedSynth: (id, localCacheKey) => this.updateSavedSynth(id, localCacheKey),

                    removedSavedSynth: (id, localCacheKey) => this.removedSavedSynth(id, localCacheKey),

                    loadSynth: (id, localCacheKey) => this.loadSynth(id, localCacheKey),

                    onGraphCreated: (instance) => this.onGraphCreated(instance),

                    onClickHandler: (node, isSelected) => this.onClickHandler(node, isSelected),

                    onFreeHandler: (nodeId, nodePosition, graphPan, graphZoom) =>
                        this.onFreeHandler(nodeId, nodePosition, graphPan, graphZoom),

                    linkHandler: (sourceNodeId, destNodeId) => this.linkHandler(sourceNodeId, destNodeId),

                    octaveDecrease: () => this.octaveDecrease(),

                    octaveIncrease: () => this.octaveIncrease(),

                    setPianoVisibility: (isPianoVisible) => this.setPianoVisibility(isPianoVisible),

                    setSpectrumVisibility: (isSpectrumVisible) => this.setSpectrumVisibility(isSpectrumVisible)

                }}
            />;
        }

    }

    function mapStateToProps (state) {
        return {
            app: state.app,
            synth: state.synth,
            ui: state.ui
        };
    }

    return connect(mapStateToProps)(ActionHandlerClass);
}

export { ActionHandler };
