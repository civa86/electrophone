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

function setViewPanel (panel) {
    return {
        type: actionTypes.SET_VIEW_PANEL,
        panel
    }
}

function setPianoVisibility (isPianoVisible) {
    return {
        type: actionTypes.SET_PIANO_VISIBILITY,
        isPianoVisible: !!isPianoVisible
    }
}

function setSpectrumVisibility (isSpectrumVisible) {
    return {
        type: actionTypes.SET_SPECTRUM_VISIBILITY,
        isSpectrumVisible: !!isSpectrumVisible
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
    setLinkMode,
    toggleLinkMode,
    setPositions,
    setGraphPan,
    setGraphZoom,
    octaveIncrease,
    octaveDecrease,
    setViewPanel,
    setPianoVisibility,
    setSpectrumVisibility,
    updatePlayingVoices
};
