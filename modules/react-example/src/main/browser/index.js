import React, { Component } from 'react';
import './styles.css';

class ExampleModuleComponent extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log('mounted example module react component')
    }
    
    render() {
        return ( 
            <div className="example-module"> 
            	<h1>Example Module React Component</h1>
            </div>
        )
    }
}

exports = {
	plugin: ExampleModuleComponent
}