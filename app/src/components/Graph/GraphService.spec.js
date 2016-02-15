import { expect } from 'chai';

import GraphService from './GraphService';

const grapLibMock = () => {
    return {
        on: (e, elem, fx) => null,
        resize: () => null,
        reset: () => null
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

    it('should have a reset method', () => {
        expect(graph.reset).to.be.a('function');
    });


    it('should have a refreshNodes method', () => {
        expect(graph.refreshNodes).to.be.a('function');
    });

    it('should have a setLinkMode method', () => {
        expect(graph.setLinkMode).to.be.a('function');
    });
});
