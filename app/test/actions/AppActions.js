import { expect } from 'chai';
import * as actions from '../../src/actions/AppActions';
import * as actionTypes from '../../src/constants/ActionTypes';

describe('App actions', () => {
    it('should create an action loadState', () => {
        const expectedAction = {
            type: actionTypes.APP_LOAD_STATE,
            state: { a: 1, b: 2 },
            workingTypes: ['a']
        };
        expect(actions.loadState({ a: 1, b: 2 }, ['a'])).to.deep.equal(expectedAction);
    });

    it('should create an action resetState', () => {
        const expectedAction = { type: actionTypes.APP_RESET_STATE };
        expect(actions.resetState()).to.deep.equal(expectedAction);
    });
});
