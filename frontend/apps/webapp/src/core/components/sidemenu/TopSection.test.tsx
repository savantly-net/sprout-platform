import { NavModelItem } from '@savantly/sprout-api';
import { render } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { initialAuthenticationState } from '../../reducers/authentication';
import TopSection from './TopSection';

const mockNavItems: NavModelItem[] = [
  {
    text: 'open'
  },
  {
    text: 'private',
    authority: 'PRIVATE'
  }
];

const mockStore = configureStore([]);

describe('TopSection when session fetched but no authority', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const store = mockStore({
    authentication: initialAuthenticationState,
    navTree: {
      items: mockNavItems
    }
  });

  it('renders 1 with no authority requirement', () => {
    const component = render(
      <BrowserRouter>
        <Provider store={store}>
          <TopSection />
        </Provider>
      </BrowserRouter>
    );
    const ss = component; //.find('.side-menu-item');
    expect(ss.children().length).toBe(1);
    expect(ss).toMatchSnapshot();
  });

});
