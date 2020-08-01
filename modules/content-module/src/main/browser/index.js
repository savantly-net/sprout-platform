import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import Home from './views/Home';
import store from './store'
import './styles.scss';

class ContentModule extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log('mounted content module react component')
    }
    
    render() {
        return ( 
            <Provider store={store}>
                    <div> 
            	        <h1>Content Module React Component</h1>
            	        <Home />
                    </div>
            </Provider>
        )
    }
}

export default ContentModule;