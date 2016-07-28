import { expect } from 'chai';
import * as actions from '../actions/SynthActions';
import * as actionTypes from '../constants/ActionTypes';

describe('Synth actions', () => {
    it('should create an action addAudioNode with default position', () => {
        const expectedAction = {
            type: actionTypes.ADD_AUDIO_NODE,
            id: 'ele1',
            isMaster: true,
            posX: 0,
            posY: 0,
            moduleType: 'Type',
            moduleProps: [{ name: 'a', value: 1 }]
        };
        expect(actions.addAudioNode({
            id: 'ele1',
            isMaster: true,
            type: 'Type',
            properties: [{ name: 'a', value: 1 }]
        })).to.deep.equal(expectedAction);
    });

    it('should create an action addAudioNode with default position', () => {
        const expectedAction = {
            type: actionTypes.ADD_AUDIO_NODE,
            id: 'ele1',
            isMaster: true,
            posX: 300,
            posY: 234,
            moduleType: 'Type',
            moduleProps: [{ name: 'a', value: 1 }]
        };
        expect(actions.addAudioNode({
            id: 'ele1',
            isMaster: true,
            posX: 300,
            posY: 234,
            type: 'Type',
            properties: [{ name: 'a', value: 1 }]
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

    it('should create an action updateNode', () => {
        const expectedAction = {
            type: actionTypes.UPDATE_NODE,
            id: 'ele1',
            propertyName: 'a',
            propertyValue: '1'
        };
        expect(actions.updateNode('ele1', 'a', '1')).to.deep.equal(expectedAction);
    });

    it('should create an action setAudioNodeSelection', () => {
        const expectedAction = {
            type: actionTypes.SET_AUDIO_NODE_SELECTION,
            node: 'ele1',
            isSelected: true
        };
        expect(actions.setAudioNodeSelection('ele1', true)).to.deep.equal(expectedAction);
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

    it('should create an action octaveIncrease', () => {
        const expectedAction = { type: actionTypes.OCTAVE_INCREASE };
        expect(actions.octaveIncrease()).to.deep.equal(expectedAction);
    });

    it('should create an action octaveDecrease', () => {
        const expectedAction = { type: actionTypes.OCTAVE_DECREASE };
        expect(actions.octaveDecrease()).to.deep.equal(expectedAction);
    });

    it('should update playing voices', () => {
        const expectedAction = {
            type: actionTypes.UPDATE_PLAYING_VOICES,
            playingVoices: ['C-4', 'A-4']
        };
        expect(actions.updatePlayingVoices(['C-4', 'A-4'])).to.deep.equal(expectedAction);
    });
});
