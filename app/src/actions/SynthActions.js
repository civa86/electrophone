import * as actionTypes from '../constants/ActionTypes';

function addAudioNode (node) {
    return {
        type: actionTypes.ADD_AUDIO_NODE,
        id: node.id
    };
}

function setAudioNodeSelection (node, isSelected) {
    return {
        type: actionTypes.SET_AUDIO_NODE_SELECTION,
        node,
        isSelected
    }
}

function setLinkMode (mode) {
    return {
        type: actionTypes.SET_LINK_MODE,
        mode
    };
}

function toggleLinkMode () {
    return {
        type: actionTypes.TOGGLE_LINK_MODE
    };
}

export {
    addAudioNode,
    setAudioNodeSelection,
    setLinkMode,
    toggleLinkMode
};
