import * as actionTypes from '../constants/ActionTypes';

export function increment () {
    return {
        type: actionTypes.INCREMENT_COUNTER
    };
}

export function decrement () {
    return {
        type: actionTypes.DECREMENT_COUNTER
    };
}

export function incrementIfOdd () {
    return (dispatch, getState) => {
        const { counter } = getState();

        if (counter % 2 === 0) {
            return;
        }

        dispatch(increment());
    };
}

export function incrementAsync () {
    return dispatch => {
        setTimeout(() => {
            dispatch(increment());
        }, 1000);
    };
}
