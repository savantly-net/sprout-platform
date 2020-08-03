import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { IPlugin } from '../state/reducers/plugins';

export default class PluginCard extends Component<{plugin: IPlugin, key: string}> {
    render() {
        const { name, version, description, key, installed } = this.props.plugin;
        return (
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title d-flex justify-content-between align-items-center">
                            <div>
                                <h4>{name}</h4>
                            </div>
                            <div>
                                <i className="fa fa-cube text-secondary icon-md"></i> 
                            </div>
                        </div>
                        <p className="card-text">{description}</p>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <Link to={'/plugins/' + key} className="btn btn-primary">Settings</Link>
                        <span className="mb-0 text-right text-dark align-bottom">v{version}</span>
                        {installed ? <span className="fa fa-check"></span> : <span></span>}
                    </div>
                </div>
            </div>
        )
    }
}
