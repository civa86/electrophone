import * as actionTypes from '../constants/ActionTypes';

function addAudioNode (node) {
    return {
        type: actionTypes.ADD_AUDIO_NODE,
        id: node.id
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

function setPositions (nodeId, nodePos, graphPan, graphZoom) {
    return {
        type: actionTypes.SET_POSITIONS,
        nodeId,
        nodePos,
        graphPan,
        graphZoom
    }
}

function setGraphPan (pan) {
    return {
        type: actionTypes.SET_GRAPH_PAN,
        pan
    }
}

function setGraphZoom (zoom) {
    return {
        type: actionTypes.SET_GRAPH_ZOOM,
        zoom
    }
}

//TODO refactor names....no audio...
export {
    addAudioNode,
    removeNode,
    removeNodes,
    linkNodes,
    setAudioNodeSelection,
    setLinkMode,
    toggleLinkMode,
    setPositions,
    setGraphPan,
    setGraphZoom
};
