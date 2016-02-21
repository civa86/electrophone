import * as actionTypes from '../constants/ActionTypes';

function synth (state = { modules: [], linkMode: false }, action = {}) {

    switch (action.type) {

        case actionTypes.ADD_AUDIO_NODE : {
            return {
                ...state,
                modules: [
                    ...state.modules,
                    {
                        id: action.id + '', //TODO remove when safe....
                        position: {
                            x: 100,
                            y: 100
                        },
                        isSelected: false,
                        link: null
                    }
                ]
            };
        }

        case actionTypes.REMOVE_NODE : {
            return {
                ...state,
                modules: state.modules.filter(e => e.id !== action.id)
            };
        }

        case actionTypes.REMOVE_NODES : {
            return {
                ...state,
                modules: state.modules.filter(e => action.nodes.indexOf(e.id) === -1)
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

        case actionTypes.SET_LINK_MODE : {
            return {
                ...state,
                linkMode: action.mode
            };
        }

        case actionTypes.TOGGLE_LINK_MODE : {
            return {
                ...state,
                linkMode: !state.linkMode
            };
        }

        default:
            return state;

    }

}

export default synth;
