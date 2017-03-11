import { expect } from 'chai';

import GraphService from '../../../src/components/Graph/GraphService';

// MOCK LIB
let state = null;

const grapLibMock = () => {
    return {
        on: (e, elem, fx) => null,
        resize: () => state = 'resizeCalled',
        reset: () => state = 'resetCalled',
        pan: () => state = 'panCalled',
        zoom: () => state = 'zoomCalled',
        minZoom: () => state = 'minZoomCalled',
        maxZoom: () => state = 'maxZoomCalled',
        add: () => state = 'addCalled',
        remove: () => state = 'removeCalled',
        nodes: () => [],
        edges: () => [],
        autoungrabify: () => state = 'autoungrabifyCalled',
        $: () => {
            return {
                addClass: () => null,
                hasClass: () => null,
                removeClass: () => null,
                connectedEdges: () => [],
                length: 0
            }
        }
    };
};

describe('GraphService library', () => {
    const graph = GraphService(grapLibMock);

    it('should have a createGraph method', () => {
        expect(graph.createGraph).to.be.a('function');
    });

    it('should throw an error if Graph Library is missing', () => {
        const errorGraph = GraphService();
        expect(errorGraph.createGraph).to.throw(Error);
    });

    it('should create a Graph without throwing errors', () => {
        graph.createGraph();
    });

    it('should have a resize method', () => {
        expect(graph.resize).to.be.a('function');
    });

    it('should call resize method on library', () => {
        graph.resize();
        expect(state).to.equal('resizeCalled');
        state = null;
    });

    it('should have a reset method', () => {
        expect(graph.reset).to.be.a('function');
    });

    it('should call reset method on library', () => {
        graph.reset();
        expect(state).to.equal('resetCalled');
        state = null;
    });

    it('should have a refreshGraph method', () => {
        expect(graph.refreshGraph).to.be.a('function');
    });

    it('should have a setLinkMode method', () => {
        expect(graph.setLinkMode).to.be.a('function');
    });
});
