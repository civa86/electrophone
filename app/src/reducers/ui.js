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
            //TODO unit test
            return {
                ...state,
                graph: {
                    ...state.graph,
                    instance: action.graphInstance
                }
            };
        }

        case actionTypes.ADD_NODE : {
            //TODO unit test
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

        default:
            return state;

    }
}

export default ui;
