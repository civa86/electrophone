import * as actionTypes from '../constants/ActionTypes';

function addAudioNode (node) {
    return {
        type: actionTypes.ADD_AUDIO_NODE,
        id: node.id,
        isMaster: node.isMaster,
        posX: node.posX || 0,
        posY: node.posY || 0,
        moduleType: node.type,
        moduleProps: [ ...node.properties ]
    };
}

function removeNode (id) {
    return {
        type: actionTypes.REMOVE_NODE,
        id: id
    };
}

function removeNodes (nodes) {
    return {
        type: actionTypes.REMOVE_NODES,
        nodes: nodes
    };
}

function linkNodes (source, dest) {
    return {
        type: actionTypes.LINK_NODES,
        source: source,
        dest: dest
    };
}

function updateNode (id, propertyName, propertyValue) {
    return {
        type: actionTypes.UPDATE_NODE,
        id,
        propertyName,
        propertyValue
    };
}

function setAudioNodeSelection (node, isSelected) {
    return {
        type: actionTypes.SET_AUDIO_NODE_SELECTION,
        node,
        isSelected
    }
}

function setPositions (nodeId, nodePos, graphPan, graphZoom) {
    return {
        type: actionTypes.SET_POSITIONS,
        nodeId,
        nodePos,
        graphPan,
        graphZoom
    }
}

function octaveIncrease () {
    return {
        type: actionTypes.OCTAVE_INCREASE
    }
}

function octaveDecrease () {
    return {
        type: actionTypes.OCTAVE_DECREASE
    }
}

function updatePlayingVoices (playingVoices) {
    return {
        type: actionTypes.UPDATE_PLAYING_VOICES,
        playingVoices
    }
}

//TODO refactor names....no audio...
export {
    addAudioNode,
    removeNode,
    removeNodes,
    linkNodes,
    updateNode,
    setAudioNodeSelection,
    setPositions,
    octaveIncrease,
    octaveDecrease,
    updatePlayingVoices
};
