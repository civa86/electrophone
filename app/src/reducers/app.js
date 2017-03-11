import * as actionTypes from '../constants/ActionTypes';
import initState from './initState';

const initialState = initState.app;

function app (state = initialState, action = {}) {

    switch (action.type) {

        case actionTypes.APP_UPDATE_SAVED_LIST : {
            return {
                ...state,
                savedList: action.list
            };
        }

        default:
            return state;

    }
}

export default app;
