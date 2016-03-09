import { expect } from 'chai';
import * as actions from '../actions/SynthActions';
import * as actionTypes from '../constants/ActionTypes';

describe('Synth actions', () => {
    it('should create an action addAudioNode', () => {
        const expectedAction = {
            type: actionTypes.ADD_AUDIO_NODE,
            id: 'ele1',
            isMaster: true,
            moduleType: 'Type',
            moduleProps: {
                a: 'a',
                b: 'b'
            }
        };
        expect(actions.addAudioNode({
            id: 'ele1',
            isMaster: true,
            type: 'Type',
            properties: {
                a: 'a',
                b: 'b'
            }
        })).to.deep.equal(expectedAction);
    });

    it('should create an action removeNode', () => {
        const expectedAction = {
            type: actionTypes.REMOVE_NODE,
            id: 'ele1'
        };
        expect(actions.removeNode('ele1')).to.deep.equal(expectedAction);
    });

    it('should create an action removeNodes', () => {
        const expectedAction = {
            type: actionTypes.REMOVE_NODES,
            nodes: ['ele1', 'ele2']
        };
        expect(actions.removeNodes(['ele1', 'ele2'])).to.deep.equal(expectedAction);
    });

    it('should create an action linkNodes', () => {
        const expectedAction = {
            type: actionTypes.LINK_NODES,
            source: 'ele1',
            dest: 'ele2'
        };
        expect(actions.linkNodes('ele1', 'ele2')).to.deep.equal(expectedAction);
    });

    it('should create an action setAudioNodeSelection', () => {
        const expectedAction = {
            type: actionTypes.SET_AUDIO_NODE_SELECTION,
            node: 'ele1',
            isSelected: true
        };
        expect(actions.setAudioNodeSelection('ele1', true)).to.deep.equal(expectedAction);
    });

    it('should create an action setLinkMode', () => {
        const expectedAction = {
            type: actionTypes.SET_LINK_MODE,
            mode: true
        };
        expect(actions.setLinkMode(true)).to.deep.equal(expectedAction);
    });

    it('should create an action toggleLinkMode', () => {
        const expectedAction = {
            type: actionTypes.TOGGLE_LINK_MODE
        };
        expect(actions.toggleLinkMode()).to.deep.equal(expectedAction);
    });

    it('should create an action setPositions', () => {
        const expectedAction = {
            type: actionTypes.SET_POSITIONS,
            nodeId: 'ele1',
            nodePos: { x: 100, y: 100 },
            graphPan: { x: 100, y: 100 },
            graphZoom: 3
        };
        expect(actions.setPositions(
            'ele1',
            { x: 100, y: 100 },
            { x: 100, y: 100 },
            3
        )).to.deep.equal(expectedAction);
    });

    it('should create an action setGraphPan', () => {
        const expectedAction = {
            type: actionTypes.SET_GRAPH_PAN,
            pan: { x: 100, y: 100 }
        };
        expect(actions.setGraphPan({ x: 100, y: 100 })).to.deep.equal(expectedAction);
    });

    it('should create an action setGraphZoom', () => {
        const expectedAction = {
            type: actionTypes.SET_GRAPH_ZOOM,
            zoom: 1
        };
        expect(actions.setGraphZoom(1)).to.deep.equal(expectedAction);
    });

    it('should create an action loadState', () => {
        const expectedAction = {
            type: actionTypes.LOAD_STATE,
            state: { a: 1, b:2 }
        };
        expect(actions.loadState({ a: 1, b:2 })).to.deep.equal(expectedAction);
    });

    it('should create an action resetState', () => {
        const expectedAction = { type: actionTypes.RESET_STATE };
        expect(actions.resetState()).to.deep.equal(expectedAction);
    });

    it('should create an action octaveIncrease', () => {
        const expectedAction = { type: actionTypes.OCTAVE_INCREASE };
        expect(actions.octaveIncrease()).to.deep.equal(expectedAction);
    });

    it('should create an action octaveDecrease', () => {
        const expectedAction = { type: actionTypes.OCTAVE_DECREASE };
        expect(actions.octaveDecrease()).to.deep.equal(expectedAction);
    });

    it('should create an action setViewPanel', () => {
        const expectedAction = {
            type: actionTypes.SET_VIEW_PANEL,
            panel: 'test'
        };
        expect(actions.setViewPanel('test')).to.deep.equal(expectedAction);
    });
});
