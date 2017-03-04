import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import WebSynth from 'electrophone';

// Components
import { ActionHandler } from '../components/ActionHandler';
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
import * as screenService from '../services/screen';

const localCacheKey = 'webSynth';

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
        const { actions } = this.props;

        actions.updateSavedList(actions.getSavedList(localCacheKey));

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
                actions.resetSaveForm();
            });
        });
    }

    isOperationInProgress () {
        return $('.modal.in').length > 0;
    }

    getKeyboardMapping () {
        const { ui, actions } = this.props;

        return [
            {
                keys: [16], //SHIFT
                down: () => {
                    if (!this.isOperationInProgress()) {
                        actions.setLinkMode(true);
                    }
                },
                up: () => {
                    if (!this.isOperationInProgress()) {
                        actions.setLinkMode(false);
                    }
                },
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

                    if (!this.isOperationInProgress()) {
                        actions.setViewPanel(toggleView);
                    }
                },
                up: () => false
            },
            {
                keys: [90], //Z
                down: () => {
                    if (!this.isOperationInProgress()) {
                        actions.octaveDecrease();
                    }
                },
                up: () => false,
                specialKeys: false
            },
            {
                keys: [88], //X
                down: () => {
                    if (!this.isOperationInProgress()) {
                        actions.octaveIncrease();
                    }
                },
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
                        actions.deleteSynthSelectedNodes();
                    }
                },
                specialKeys: false
            }
        ]
    }

    render () {
        const { app, ui, synth, actions } = this.props;

        return (
            <div id="main-wrapper" className="container-fluid">
                <NoAudioWarning/>

                <SaveModal items={app.savedList} localCacheKey={localCacheKey} />

                <LoadModal items={app.savedList} localCacheKey={localCacheKey} />

                <Header height={screenService.getHeaderHeight()}
                        repoUrl={process.env.GITHUB_REPO_URL}
                        linkMode={ui.graph.linkMode}
                        visiblePanel={ui.viewPanel}
                        synthModules={WebSynth.describeModules().filter(e => e.type !== WebSynth.TYPES.MASTER)}
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
                        updateModule={(id, prop, value) => actions.updateSynthModule(id, prop, value)}
                        destroyModule={(id) => actions.deleteSynthModule(id)}
                    />
                </div>

                <Synth state={synth}
                       isOperationInProgress={() => this.isOperationInProgress()}
                       audioContext={this.audioContext}
                       footerHeight={screenService.getFooterHeight()}
                       headerHeight={screenService.getHeaderHeight()}
                       isPianoVisible={ui.isPianoVisible}
                       isSpectrumVisible={ui.isSpectrumVisible}
                       updatePlayingVoices={playingVoices => actions.updatePlayingVoices(playingVoices)}
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

export default connect(mapStateToProps)(ActionHandler(App));
