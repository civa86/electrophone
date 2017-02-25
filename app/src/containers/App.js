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
import SaveModal from '../components/Modals/SaveModal';
import LoadModal from '../components/Modals/LoadModal';

//Panels
import ControlPanel from '../components/ControlPanel';
import GraphPanel from '../components/Graph';

// Services
import localCacheService from '../services/localCache';
import * as screenService from '../services/screen';

const
    storage = (typeof(Storage) !== 'undefined' && window.localStorage) ? window.localStorage : null,
    localCache = localCacheService(storage),
    localCacheKey = 'webSynth',
    synthModules = WebSynth.describeModules(),
    Actions = { ...AppActions, ...UiActions, ...SynthActions };

//TODO remove dispatch and use highorder??

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
        const { dispatch } = this.props;
        return {
            setViewPanel: (viewPanel) =>
                dispatch(Actions.setViewPanel(viewPanel)),
                
            octaveDecrease: () =>
                dispatch(Actions.octaveDecrease()),
            octaveIncrease: () =>
                dispatch(Actions.octaveIncrease())
        }
    }

    removeSelectedNodes () {
        //TODO check and use actions.deleteSynthSelectedNodes
        const
            { dispatch } = this.props,
            selectedNodes = this.props.synth.modules.filter(e => e.isSelected && !e.isMaster).map(e => e.id);

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

    updateModule (id, propertyName, propertyValue) {
        const { dispatch } = this.props;
        dispatch(Actions.updateNode(id, propertyName, propertyValue));
    }

    render () {
        const { app, ui, synth, dispatch } = this.props;
        
        return (
            <div id="main-wrapper" className="container-fluid">
                <NoAudioWarning/>

                <SaveModal items={app.savedList} localCacheKey={localCacheKey} />

                <LoadModal items={app.savedList} localCacheKey={localCacheKey} />

                <Header height={screenService.getHeaderHeight()}
                        repoUrl={process.env.GITHUB_REPO_URL}
                        linkMode={ui.graph.linkMode}
                        visiblePanel={ui.viewPanel}
                        synthModules={synthModules.filter(e => e.type !== WebSynth.TYPES.MASTER)}
                        numSelectedNodes={synth.modules.filter(e => e.isSelected === true).length}
                        libVersion={process.env.LIB_VERSION}
                />

                <div id="panel-wrapper"
                     style={{ marginTop: screenService.getHeaderHeight() }}>
                    <GraphPanel
                        isVisible={ui.viewPanel === 'graph'}
                        synth={synth}
                        ui={ui}
                        graphWidth={screenService.getGraphWidth()}
                        graphHeight={screenService.getGraphHeight()}
                    />
                    <ControlPanel
                        isVisible={ui.viewPanel === 'control'}
                        modules={synth.modules}
                        updateModule={(id, prop, value) => this.updateModule(id, prop, value)}
                        destroyModule={(id) => dispatch(Actions.removeNode(id))}
                    />
                </div>

                <Synth state={synth}
                       isOperationInProgress={() => this.isOperationInProgress()}
                       audioContext={this.audioContext}
                       footerHeight={screenService.getFooterHeight()}
                       headerHeight={screenService.getHeaderHeight()}
                       isPianoVisible={ui.isPianoVisible}
                       isSpectrumVisible={ui.isSpectrumVisible}
                       updatePlayingVoices={playingVoices => dispatch(Actions.updatePlayingVoices(playingVoices,{
                                                                            zoom: ui.graph.instance.zoom(),
                                                                            pan: ui.graph.instance.pan()
                                                                        }))}
                />

                <GlobalKeys keyboardMapping={this.getKeyboardMapping()}/>

                <Footer height={screenService.getFooterHeight()}
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
