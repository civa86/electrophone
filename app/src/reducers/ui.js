import * as actionTypes from '../constants/ActionTypes';
import initState from './initState';

const initialState = initState.ui;

function ui (state = initialState, action = {}) {

    switch (action.type) {

        case actionTypes.SET_LINK_MODE : {
            let viewPanel = state.viewPanel;
            if (state.viewPanel !== 'graph' && action.mode === true) {
                viewPanel = 'graph';
            }
            return {
                ...state,
                graph: {
                    ...state.graph,
                    linkMode: action.mode
                },
                viewPanel: viewPanel
            };

        }

        case actionTypes.TOGGLE_LINK_MODE : {
            let viewPanel = state.viewPanel;
            if (state.viewPanel !== 'graph' && state.graph.linkMode === false) {
                viewPanel = 'graph';
            }
            return {
                ...state,
                graph: {
                    ...state.graph,
                    linkMode: !state.graph.linkMode
                },
                viewPanel
            };
        }

        case actionTypes.SET_VIEW_PANEL : {
            let linkMode = state.graph.linkMode;
            if (action.panel !== 'graph' && state.graph.linkMode === true) {
                linkMode = false;
            }
            return {
                ...state,
                graph: {
                    ...state.graph,
                    linkMode
                },
                viewPanel: action.panel
            };
        }

        case actionTypes.SET_POSITIONS : {
            return {
                ...state,
                graph: {
                    ...state.graph,
                    pan: {
                        x: action.graphPan.x,
                        y: action.graphPan.y
                    },
                    zoom: action.graphZoom
                }
            };
        }

        case actionTypes.SET_PIANO_VISIBILITY : {
            return {
                ...state,
                isPianoVisible: action.isPianoVisible
            };
        }

        case actionTypes.SET_SPECTRUM_VISIBILITY : {
            return {
                ...state,
                isSpectrumVisible: action.isSpectrumVisible
            };
        }

        case actionTypes.SET_GRAPH_ZOOM : {
            return {
                ...state,
                graph: {
                    ...state.graph,
                    zoom: action.zoom
                }
            };
        }

        case actionTypes.SET_GRAPH_PAN : {
            return {
                ...state,
                graph: {
                    ...state.graph,
                    pan: {
                        x: action.pan.x,
                        y: action.pan.y
                    }
                }
            };
        }

        case actionTypes.SET_GRAPH_INSTANCE : {
            return {
                ...state,
                graph: {
                    ...state.graph,
                    instance: action.graphInstance
                }
            };
        }

        case actionTypes.ADD_NODE : {
            return {
                ...state,
                graph: {
                    ...state.graph,
                    zoom: action.graph.zoom,
                    pan: {
                        x: action.graph.pan.x,
                        y: action.graph.pan.y
                    }
                }
            };
        }

        case actionTypes.UPDATE_PLAYING_VOICES : {
            return {
                ...state,
                graph: {
                    ...state.graph,
                    zoom: action.graph.zoom,
                    pan: {
                        x: action.graph.pan.x,
                        y: action.graph.pan.y
                    }
                }
            };
        }

        case actionTypes.APP_LOAD_STATE : {
            return {
                ...state,
                viewPanel:
                    (action.state.ui.viewPanel !== undefined && action.state.ui.viewPanel !== null) ?
                        action.state.ui.viewPanel : state.viewPanel,
                isPianoVisible:
                    (action.state.ui.isPianoVisible !== undefined && action.state.ui.isPianoVisible !== null) ?
                        action.state.ui.isPianoVisible : state.isPianoVisible,
                isSpectrumVisible:
                    (action.state.ui.isSpectrumVisible !== undefined && action.state.ui.isSpectrumVisible !== null) ?
                        action.state.ui.isSpectrumVisible : state.isSpectrumVisible
            };
        }

        default:
            return state;

    }
}

export default ui;
