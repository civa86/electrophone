import { expect } from 'chai';

import localCacheService from '../../src/services/localCache';

const storageMock = () => {
    let storage = {};

    return {
        setItem: (key, value) => {
            storage[key] = value || '';
        },
        getItem: key => {
            return key in storage ? storage[key] : null;
        },
        removeItem: key => {
            delete storage[key];
        },
        get length() {
            return Object.keys(storage).length;
        },
        key: i => {
            const keys = Object.keys(storage);
            return keys[i] || null;
        },
        clear: () => {
            storage = {}
        },
        inspect: () => storage
    };
};

const storage = storageMock();

beforeEach(() => {
    return storage.clear();
});

describe('localCache Service library', () => {
    const localCache = localCacheService(storage);

    it('should have a method itemsList', () => {
        expect(localCache.itemsList).to.be.a('function');
    });

    it('should list all items in storage key', () => {
        expect(() => localCache.itemsList()).to.throw('no storage key provided');

        expect(localCache.itemsList('key')).is.an('array');
        expect(localCache.itemsList('key').length).to.be.equal(0);
    });

    it('should have a method getItem', () => {
        expect(localCache.getItem).to.be.a('function');
    });

    it('should get an item by id from the storage key', () => {
        storage.setItem('key', JSON.stringify([{ id: 'id1', item: { a: 2 } }]));

        const
            notFound = localCache.getItem('key', 'not-present'),
            elem = localCache.getItem('key', 'id1');

        expect(notFound).to.be.undefined;
        expect(elem).not.to.be.undefined;
        expect(elem.item).to.deep.equal({ a: 2 });
    });

    it('should have a method addItem', () => {
        expect(localCache.addItem).to.be.a('function');
    });

    it('should add an item with id in the storage key', () => {
        let snapshot;

        //Insert first item
        localCache.addItem('key', 'id1', { a: 2 });
        snapshot = localCache.itemsList('key');
        expect(snapshot).is.an('array');
        expect(snapshot.length).to.be.equal(1);

        //Insert second item
        localCache.addItem('key', 'id2', { f: 5 });
        snapshot = localCache.itemsList('key');
        expect(snapshot.length).to.be.equal(2);

        //No duplicates
        expect(() => localCache.addItem('key', 'id2', { f: 5 })).to.throw('id2 already exists')
    });

    it('should have a method updateItem', () => {
        expect(localCache.updateItem).to.be.a('function');
    });

    it('should update an item with id in the storage key', () => {
        localCache.addItem('key', 'id1', { a: 2 });
        expect(localCache.getItem('key', 'id1').item.a).to.be.equal(2);

        localCache.updateItem('key', 'id1', { a: 22, b: 9 });
        expect(localCache.getItem('key', 'id1').item.a).to.be.equal(22);
        expect(localCache.getItem('key', 'id1').item.b).to.be.equal(9);

        //Item not found
        expect(() => localCache.updateItem('key', 'not-present', { f: 5 })).to.throw('not-present not found')
    });

    it('should have a method removeItem', () => {
        expect(localCache.removeItem).to.be.a('function');
    });

    it('should remove an item with id from the storage key', () => {
        localCache.addItem('key', 'id1', { a: 2 });
        localCache.addItem('key', 'id2', { a: 2 });

        expect(localCache.getItem('key', 'id1').item.a).to.be.equal(2);

        localCache.removeItem('key', 'id1');

        expect(localCache.getItem('key', 'id1')).to.be.undefined;
        expect(localCache.getItem('key', 'id2')).not.to.be.undefined;
        expect(localCache.itemsList('key').length).to.be.equal(1);

        //Item not found
        expect(() => localCache.removeItem('key', 'not-present')).to.throw('not-present not found')
    });

    it('should have a method reset', () => {
        expect(localCache.reset).to.be.a('function');
    });

    it('should reset storage', () => {
        localCache.reset();
        expect(storage.inspect()).to.be.deep.equal({});
    });

});
