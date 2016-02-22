
import { expect } from 'chai';
import synth from './synth';
import {
    addAudioNode,
    removeNode,
    removeNodes,
    linkNodes,
    setAudioNodeSelection,
    setLinkMode,
    toggleLinkMode,
    setPositions,
    setGraphPan
} from '../actions/SynthActions';

const deepFreeze = (obj) => {
    // Retrieve the property names defined on obj
    const propNames = Object.getOwnPropertyNames(obj);

    // Freeze properties before freezing self
    propNames.forEach(name => {
        const prop = obj[name];

        // Freeze prop if it is an object
        if (typeof prop === 'object' && prop !== null) {
            deepFreeze(prop);
        }
    });

    // Freeze self (no-op if already frozen)
    return Object.freeze(obj);
};

describe('Synth reducer', () => {
    let state = deepFreeze(synth());

    it('should have an initial state', () => {
        expect(state.modules).to.deep.equal([]);
        expect(state.linkMode).to.equal(false);
        expect(state.graph.pan.x).to.equal(0);
        expect(state.graph.pan.y).to.equal(0);
        expect(state.graph.zoom).to.equal(1);
    });

    it('should set link mode on', () => {
        state = synth(state, setLinkMode(true));
        expect(state.linkMode).to.equal(true);
        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    it('should toggle link mode', () => {
        state = synth(state, toggleLinkMode());
        expect(state.linkMode).to.equal(false);
        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    it('should add an audio node', () => {
        state = synth(state, addAudioNode({ id: 'ele1' }));
        expect(state.modules.length).to.equal(1);
        expect(state.modules[0].id).to.equal('ele1');
        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    it('should remove an audio node', () => {
        state = synth(state, addAudioNode({ id: 'ele2' }));
        expect(state.modules.length).to.equal(2);
        state = synth(state, removeNode('ele2'));
        expect(state.modules.length).to.equal(1);
        expect(state.modules[0].id).to.equal('ele1');
        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    it('should remove an array of audio node', () => {
        state = synth(state, addAudioNode({ id: 'ele3' }));
        expect(state.modules.length).to.equal(2);
        state = synth(state, addAudioNode({ id: 'ele4' }));
        expect(state.modules.length).to.equal(3);
        state = synth(state, removeNodes(['ele3', 'ele4']));
        expect(state.modules.length).to.equal(1);
        expect(state.modules[0].id).to.equal('ele1');
        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    it('should link nodes', () => {
        state = synth(state, addAudioNode({ id: 'ele2' }));
        expect(state.modules.length).to.equal(2);
        state = synth(state, linkNodes('ele1', 'ele2'));
        expect(state.modules[0].id).to.equal('ele1');
        expect(state.modules[0].link).to.equal('ele2');
        state = synth(state, removeNode('ele2'));
        expect(state.modules.length).to.equal(1);
        expect(state.modules[0].id).to.equal('ele1');
        expect(state.modules[0].link).to.equal(null);
        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    it('should select an audio node', () => {
        let selectedNode;

        state = synth(state, setAudioNodeSelection('ele1', true));
        selectedNode = state.modules.filter(e => e.id === 'ele1').pop();
        expect(selectedNode.isSelected).to.equal(true);
    });

    it('should set positions', () => {
        let selectedNode;

        state = synth(state, setPositions('ele1', { x: 100, y: 100 }));
        selectedNode = state.modules.filter(e => e.id === 'ele1').pop();
        expect(selectedNode.position.x).to.equal(100);
        expect(selectedNode.position.y).to.equal(100);
    });

    it('should set graph pan', () => {
        state = synth(state, setGraphPan({ x: 100, y: 100 }));
        expect(state.graph.pan.x).to.equal(100);
        expect(state.graph.pan.y).to.equal(100);
    });
});
