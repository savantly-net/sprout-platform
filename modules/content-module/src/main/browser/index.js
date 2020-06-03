import React, { Component } from 'react'

class ContentModule extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log('mounted content module react component')
    }
    
    render() {
        return ( 
            <div> 
            	<h1>Content Module React Component</h1>
            </div>
        )
    }
}

let domContainer = document.querySelector('#contentTest');
ReactDOM.render(<ContentModule />, domContainer);