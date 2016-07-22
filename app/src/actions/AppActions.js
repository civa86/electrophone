import * as actionTypes from '../constants/ActionTypes';

function loadState (state, workingTypes) {
    return {
        type: actionTypes.APP_LOAD_STATE,
        state,
        workingTypes
    }
}

function resetState () {
    return {
        type: actionTypes.APP_RESET_STATE
    }
}

export {
    loadState,
    resetState
};
