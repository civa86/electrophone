import { expect } from 'chai';
import app from '../../src/reducers/app';
import initState from '../../src/reducers/initState';
import { updateSavedList } from '../../src/actions/AppActions';

const
    initialState = initState.app,
    deepFreeze = (obj) => {
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

describe('App reducer', () => {
    let state = deepFreeze(app());

    it('should have an initial state', () => {
        expect(state).to.deep.equal(initialState);
    });

    it('should update the saved list', () => {
        state = app(state, updateSavedList([
            {
                id: 'id1',
                item: 'test'
            },
            {
                id: 'id2',
                item: 'test2'
            }
        ]));

        expect(state.savedList.length).to.equal(2);
    });
});
