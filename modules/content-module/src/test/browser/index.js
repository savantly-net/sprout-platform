import React from 'react';
import { Provider } from 'react-redux'
import { render} from 'react-dom';
import ContentModule from '../../main/browser';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from '../../main/browser/store'

const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ContentModule />
        </ConnectedRouter>
    </Provider>
);
render(<App />, document.getElementById("root"));