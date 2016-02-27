import * as actionTypes from '../constants/ActionTypes';
import initState from './initState';

function synth (state = initState, action = {}) {

    const cleanNodeLinks = (nodes) => {
        return nodes.map(e => {
            if (e.link === null || nodes.filter(ec => ec.id === e.link).length === 1) {
                return e;
            }

            return {
                ...e,
                link: null
            };
        });
    };

    switch (action.type) {

        case actionTypes.ADD_AUDIO_NODE : {
            return {
                ...state,
                modules: [
                    ...state.modules,
                    {
                        id: action.id,
                        position: {
                            x: 100,
                            y: 100
                        },
                        isMaster: false,
                        isSelected: false,
                        link: null
                    }
                ]
            };
        }

        case actionTypes.REMOVE_NODE : {
            const filtered = state.modules.filter(e => e.id !== action.id);
            return {
                ...state,
                modules: cleanNodeLinks(filtered)
            };
        }

        case actionTypes.REMOVE_NODES : {
            const filtered = state.modules.filter(e => action.nodes.indexOf(e.id) === -1);
            return {
                ...state,
                modules: cleanNodeLinks(filtered)
            };
        }

        case actionTypes.LINK_NODES : {
            return {
                ...state,
                modules: state.modules.map(e => {
                    if (e.id !== action.source) {
                        return e;
                    }

                    return {
                        ...e,
                        link: action.dest
                    };
                })
            };
        }

        case actionTypes.SET_AUDIO_NODE_SELECTION : {
            return {
                ...state,
                modules: state.modules.map(e => {
                    if (e.id !== action.node) {
                        return e;
                    }

                    return {
                        ...e,
                        isSelected: action.isSelected
                    };
                })
            };
        }

        case actionTypes.SET_LINK_MODE : {
            return {
                ...state,
                graph: {
                    ...state.graph,
                    linkMode: action.mode
                }
            };
        }

        case actionTypes.TOGGLE_LINK_MODE : {
            return {
                ...state,
                graph: {
                    ...state.graph,
                    linkMode: !state.graph.linkMode
                }
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
                },
                modules: state.modules.map(e => {
                    if (e.id !== action.nodeId) {
                        return e;
                    }

                    return {
                        ...e,
                        position: {
                            x: action.nodePos.x,
                            y: action.nodePos.y
                        }
                    };
                })
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

        case actionTypes.SET_GRAPH_ZOOM : {
            return {
                ...state,
                graph: {
                    ...state.graph,
                    zoom: action.zoom
                }
            };
        }

        case actionTypes.LOAD_STATE : {
            return { ...action.state };
        }
        case actionTypes.RESET_STATE : {
            return { ...initState };
        }

        default:
            return state;

    }

}

export default synth;
