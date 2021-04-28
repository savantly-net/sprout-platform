import React from 'react';
import { Provider } from 'react-redux';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { AuthenticationState } from '../../../types';
import { PrivateComponent } from './PrivateComponent';

const sessionFetchedAuthState: AuthenticationState = {
  isAuthenticated: true,
  loading: false,
  loginError: false,
  sessionFetchFailed: false,
  sessionHasBeenFetched: true,
  showLogin: false,
  user: {
    authorities: ['EVERYONE'],
    name: 'user'
  }
};

const sessionNOTFetchedAuthState: AuthenticationState = {
  isAuthenticated: false,
  loading: true,
  loginError: false,
  sessionFetchFailed: false,
  sessionHasBeenFetched: false,
  showLogin: false,
  user: {
    authorities: [],
    name: 'anonymous'
  }
};

const mockStore = configureStore([]);

describe('PrivateComponent when session fetched', () => {
  let component: ReactTestRenderer;
  //let container: HTMLElement;
  let store: any;
  beforeEach(() => {
    // setup a DOM element as a render target
    //container = document.createElement('div');
    //document.body.appendChild(container);
    store = mockStore({ authentication: sessionFetchedAuthState });
  });

  afterEach(() => {
    // cleanup on exiting
    //container && unmountComponentAtNode(container) && container.remove();
    //container = null;
  });

  it('renders when there is no authority requirement', () => {
    act(() => {
      component = create(
        <Provider store={store}>
          <PrivateComponent hasAnyAuthority={[]}>true</PrivateComponent>
        </Provider>
      );
    });
    const ss = component.toJSON();
    expect(ss).toBe('true');
    expect(ss).toMatchSnapshot();
  });

  it('doesnt render when the user lacks authority', () => {
    act(() => {
      component = create(
        <Provider store={store}>
          <PrivateComponent hasAnyAuthority={['ADMIN', 'FM_ADMIN']}>true</PrivateComponent>
        </Provider>
      );
    });
    const ss = component.toJSON();
    expect(ss).not.toBe('true');
    expect(ss).toMatchSnapshot();
  });

  it('renders when the user has matching authority', () => {
    act(() => {
      component = create(
        <Provider store={store}>
          <PrivateComponent hasAnyAuthority={['EVERYONE', 'FM_ADMIN']}>true</PrivateComponent>
        </Provider>
      );
    });
    const ss = component.toJSON();
    expect(ss).toBe('true');
    expect(ss).toMatchSnapshot();
  });
});

describe('PrivateComponent when session NOT fetched', () => {
  let component: ReactTestRenderer;
  let store: any;
  beforeEach(() => {
    store = mockStore({ authentication: sessionNOTFetchedAuthState });
  });

  afterEach(() => {
  });

  it('doesnt render if the session is not fetched, even if there is no authority requirement', () => {
    act(() => {
      component = create(
        <Provider store={store}>
          <PrivateComponent hasAnyAuthority={[]}>true</PrivateComponent>
        </Provider>
      );
    });
    const ss = component.toJSON();
    expect(ss).not.toBe('true');
    expect(ss).toMatchSnapshot();
  });

  it('doesnt render when the user lacks authority', () => {
    act(() => {
      component = create(
        <Provider store={store}>
          <PrivateComponent hasAnyAuthority={['ADMIN', 'FM_ADMIN']}>true</PrivateComponent>
        </Provider>
      );
    });
    const ss = component.toJSON();
    expect(ss).not.toBe('true');
    expect(ss).toMatchSnapshot();
  });
});
