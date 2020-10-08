import React, { Component } from 'react';
import { AppPlugin } from "@savantly/sprout-api";
import './styles.css';

const plugin = new AppPlugin()
.addConfigPage({
    body: "<h1>test body</h1>",
    id: "defaultPage",
    title: "test config page",
});


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

plugin.root = ExampleModuleComponent


exports = {
	plugin
}