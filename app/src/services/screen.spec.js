import { expect } from 'chai';

import screenService from './screen';

describe('screen Service library', () => {
    const screen = screenService();

    it('should exist and it is an object', () => {
        expect(screen).to.be.a('object');
    });

    it('should have a method getWindowSize', () => {
        expect(screen.getWindowSize).to.be.a('function');
    });

    it('should have a method getSizeById', () => {
        expect(screen.getSizeById).to.be.a('function');
    });
});
