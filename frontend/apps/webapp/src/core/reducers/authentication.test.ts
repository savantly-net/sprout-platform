import moxios from 'moxios';
import { AnyAction } from 'redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AuthenticationState } from '../../types';
import { getSession, initialAuthenticationState } from './authentication';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore<{ authentication: AuthenticationState }>(middlewares);

describe('authentication tests', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('has successful login', function (done) {
    const store: MockStoreEnhanced<{ authentication: AuthenticationState }> = mockStore({
      authentication: initialAuthenticationState
    });
    // Match against an exact URL value
    moxios.stubRequest('/api/account', {
      status: 200,
      response: {
        name: 'user@savantly.net',
        authorities: [
          'DASHBOARD_EDIT',
          'FILES_DELETE',
          'FOLDER_CREATE',
          'FOLDER_DELETE',
          'offline_access',
          'FOLDER_READ',
          'FILES_CREATE',
          'DASHBOARD_DELETE',
          'ADMIN',
          'FILES_READ',
          'DASHBOARD_READ',
          'EVERYONE'
        ]
      }
    });

    expect(store.getState().authentication).toStrictEqual(initialAuthenticationState);

    // Return the promise
    store.dispatch((getSession() as unknown) as AnyAction).then(() => {
      const actions = store.getActions();

      expect(actions[0].type).toEqual('authentication/getSession/pending');
      expect(actions[1].type).toEqual('authentication/getSession/fulfilled');

      expect(store.getState()).toMatchSnapshot();
      done();
    });
  });

  it('has failed login', function (done) {
    const store: MockStoreEnhanced<{ authentication: AuthenticationState }> = mockStore({
      authentication: initialAuthenticationState
    });
    // Match against an exact URL value
    moxios.stubRequest('/api/account', {
      status: 401
    });

    expect(store.getState().authentication).toStrictEqual(initialAuthenticationState);

    // Return the promise
    store.dispatch((getSession() as unknown) as AnyAction).then(() => {
      const actions = store.getActions();

      expect(actions[0].type).toEqual('authentication/getSession/pending');
      expect(actions[1].type).toEqual('authentication/getSession/rejected');

      expect(store.getState()).toMatchSnapshot();
      done();
    });
  });
});
