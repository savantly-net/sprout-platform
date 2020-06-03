import React, { Component } from "react";

class PluginComponent extends Component {
    render() {
        let Component = this.props.key;
        return <Component key={this.props.key} />;
    }
}
export default PluginComponent;