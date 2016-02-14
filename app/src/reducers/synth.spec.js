import { expect } from 'chai';
import { addAudioNode, setAudioNodeSelection, setLinkMode, toggleLinkMode } from '../actions/SynthActions';
import synth from './synth';

describe('Synth reducer', () => {
    const initialState = synth();

    it('should have an initial state equal to an empty array when invoked without args', () => {
        expect(initialState.modules).to.deep.equal([]);
    });

    it('should add an audio node', () => {
        const newState = synth(initialState, addAudioNode({ id: 'ele1' }));
        expect(newState.modules.length).to.equal(1);
        expect(newState.modules[0].id).to.equal('ele1');
        expect(Object.keys(newState)).to.deep.equal(Object.keys(initialState));
    });

    it('should select an audio node', () => {
        const newState = synth(
            audioNode(initialState, addAudioNode({ id: 'ele1' })),
            setAudioNodeSelection('ele1', true)
            ),
            selectedNode = newState.modules.filter(e => e.id === 'ele1').pop();
        expect(selectedNode.isSelected).to.equal(true);
    });

    it('should set link mode on', () => {
        const newState = synth(initialState, setLinkMode(true));
        expect(newState.linkMode).to.equal(true);
        expect(Object.keys(newState)).to.deep.equal(Object.keys(initialState));
    });

    it('should toggle link mode', () => {
        const newState = synth(audioNode(initialState, setLinkMode(true)), toggleLinkMode());
        expect(newState.linkMode).to.equal(false);
        expect(Object.keys(newState)).to.deep.equal(Object.keys(initialState));
    });
});
