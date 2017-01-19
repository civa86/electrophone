import { expect } from 'chai';
import * as actions from '../../src/actions/SynthActions';
import * as actionTypes from '../../src/constants/ActionTypes';

describe('Synth actions', () => {
    it('should create an action addNode with default position', () => {
        const expectedAction = {
            type: actionTypes.ADD_NODE,
            id: 'ele1',
            isMaster: true,
            posX: 300,
            posY: 234,
            moduleType: 'Type',
            moduleProps: [{ name: 'a', value: 1 }],
            graph: {
                zoom: 1,
                pan: {
                    x: 0,
                    y: 0
                }
            }
        };
        expect(actions.addNode(
            {
                id: 'ele1',
                isMaster: true,
                posX: 300,
                posY: 234,
                type: 'Type',
                properties: [{ name: 'a', value: 1 }]
            },
            {
                zoom: 1,
                pan: {
                    x: 0,
                    y: 0
                }
            }
        )).to.deep.equal(expectedAction);
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

    it('should create an action setNodeSelection', () => {
        const expectedAction = {
            type: actionTypes.SET_NODE_SELECTION,
            node: 'ele1',
            isSelected: true
        };
        expect(actions.setNodeSelection('ele1', true)).to.deep.equal(expectedAction);
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
            playingVoices: ['C-4', 'A-4'],
            graph: {
                zoom: 1,
                pan: {
                    x: 0,
                    y: 0
                }
            }
        };
        expect(actions.updatePlayingVoices(
            ['C-4', 'A-4'],
            {
                zoom: 1,
                pan: {
                    x: 0,
                    y: 0
                }
            }
        )).to.deep.equal(expectedAction);
    });
});
