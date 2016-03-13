import { expect } from 'chai';

import localCacheService from './localCache';

describe('localCache Service library', () => {
    const localCache = localCacheService();

    it('should exist and it is an object', () => {
        expect(localCache).to.be.a('object');
    });

    it('should have a method saveState', () => {
        expect(localCache.saveState).to.be.a('function');
    });

    it('should have a method loadState', () => {
        expect(localCache.loadState).to.be.a('function');
    });
});
