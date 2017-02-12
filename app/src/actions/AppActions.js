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

function updateSavedList (list) {
    return {
        type: actionTypes.APP_UPDATE_SAVED_LIST, 
        list    
    }
}

export {
    loadState,
    resetState,
    updateSavedList
};
