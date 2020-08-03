import React, { Component } from "react";

interface PluginComponentProps {
    key:string
}

class PluginComponent extends Component<PluginComponentProps> {
    render() {
        let Component = this.props.key;
        return <Component key={this.props.key} />;
    }
}
export default PluginComponent;