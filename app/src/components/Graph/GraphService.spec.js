import { expect } from 'chai';
import GraphService from './GraphService';

describe('GraphService library', () => {
    const graph = GraphService();

    it('should have a resize method', () => {
        expect(graph.resize).to.be.a('function');
    });

    it('should have a createGraph method', () => {
        expect(graph.createGraph).to.be.a('function');
        //TODO create spies...
        //graph.createGraph();
    });

    it('should have a refreshNodes method', () => {
        expect(graph.refreshNodes).to.be.a('function');
    });

    it('should have a setLinkMode method', () => {
        expect(graph.setLinkMode).to.be.a('function');
    });
});
