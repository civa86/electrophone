import * as actionTypes from '../constants/ActionTypes';
import initState from './initState';

const initialState = initState.synth;

function synth (state = initialState, action = {}) {

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
                        type: action.moduleType,
                        properties: [ ...action.moduleProps ].map(prop => ({
                            ...prop,
                            value: (prop) ? prop.defaultValue : null
                        })),
                        isMaster: action.isMaster || false,
                        position: {
                            x: action.posX,
                            y: action.posY
                        },
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

        case actionTypes.UPDATE_NODE : {
            return {
                ...state,
                modules: state.modules.map(e => {
                    if (e.id !== action.id) {
                        return e;
                    }

                    return {
                        ...e,
                        properties: e.properties.map(p => {
                            if (p.name !== action.propertyName) {
                                return p;
                            }

                            return {
                                ...p,
                                value: action.propertyValue
                            };
                        })
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

        case actionTypes.SET_POSITIONS : {
            return {
                ...state,
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

        case actionTypes.LOAD_STATE : {
            let loadedState = initialState;

            if (
                action.state &&
                typeof action.state === 'object' &&
                action.state.modules &&
                action.state.modules.constructor === Array &&
                action.workingTypes &&
                action.workingTypes.constructor === Array
            ) {
                loadedState = { ...action.state };
                loadedState.modules = cleanNodeLinks(
                    loadedState.modules.filter(e => action.workingTypes.indexOf(e.type) !== -1)
                );

            }

            return {
                ...state,
                ...loadedState
            };
        }

        case actionTypes.RESET_STATE : {
            return {
                ...initialState
            };
        }

        case actionTypes.OCTAVE_INCREASE : {
            const octave = (state.octave < 10) ? state.octave + 1 : state.octave;
            return {
                ...state,
                octave
            };
        }

        case actionTypes.OCTAVE_DECREASE : {
            const octave = (state.octave > 0) ? state.octave - 1 : state.octave;
            return {
                ...state,
                octave
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

        case actionTypes.UPDATE_PLAYING_VOICES : {
            return {
                ...state,
                playingVoices: [...action.playingVoices]
            };
        }

        default:
            return state;

    }
}

export default synth;
