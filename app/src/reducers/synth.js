import _ from 'lodash';
import * as actionTypes from '../constants/ActionTypes';

function synth (state = { modules: [], linkMode: false }, action = {}) {

    switch (action.type) {

        case actionTypes.ADD_AUDIO_NODE : {
            const newModules = [...state.modules, {
                id: action.id + '',
                isSelected: false,
                link: null
            }];

            return _.assign({}, state, { modules: newModules });
        }

        case actionTypes.SET_AUDIO_NODE_SELECTION : {
            const newModules = state.modules.map(e => {
                if (e.id !== action.node) {
                    return e;
                }

                return {
                    ...e,
                    isSelected: action.isSelected
                };
            });

            return _.assign({}, state, { modules: newModules });
        }

        case actionTypes.SET_LINK_MODE : {
            return _.assign({}, state, { linkMode: action.mode });
        }

        case actionTypes.TOGGLE_LINK_MODE : {
            return _.assign({}, state, { linkMode: !state.linkMode });
        }

        default:
            return state;

    }

}

export default synth;
