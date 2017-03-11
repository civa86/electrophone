import * as actionTypes from '../constants/ActionTypes';

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

function setPianoVisibility (isPianoVisible) {
    return {
        type: actionTypes.SET_PIANO_VISIBILITY,
        isPianoVisible: !!isPianoVisible
    };
}

function setSpectrumVisibility (isSpectrumVisible) {
    return {
        type: actionTypes.SET_SPECTRUM_VISIBILITY,
        isSpectrumVisible: !!isSpectrumVisible
    };
}

function setViewPanel (panel) {
    return {
        type: actionTypes.SET_VIEW_PANEL,
        panel
    };
}

function setGraphPan (pan) {
    return {
        type: actionTypes.SET_GRAPH_PAN,
        pan
    };
}

function setGraphZoom (zoom) {
    return {
        type: actionTypes.SET_GRAPH_ZOOM,
        zoom
    };
}

function setGraphInstance (graphInstance) {
    return {
        type: actionTypes.SET_GRAPH_INSTANCE,
        graphInstance
    };
}

export {
    setLinkMode,
    toggleLinkMode,
    setPianoVisibility,
    setSpectrumVisibility,
    setViewPanel,
    setGraphPan,
    setGraphZoom,
    setGraphInstance
};
