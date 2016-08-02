import * as actionTypes from '../constants/ActionTypes';

function addNode (node) {
    return {
        type: actionTypes.ADD_NODE,
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

function setNodeSelection (node, isSelected) {
    return {
        type: actionTypes.SET_NODE_SELECTION,
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

export {
    addNode,
    removeNode,
    removeNodes,
    linkNodes,
    updateNode,
    setNodeSelection,
    setPositions,
    octaveIncrease,
    octaveDecrease,
    updatePlayingVoices
};
