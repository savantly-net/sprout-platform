import React, { Component } from 'react';
import PluginListComponent from '../components/PluginListComponent';

export class Dashboard extends Component {
  render () {
    return (
      <div>
        <div className="row">
          <div className="col-xl-12 grid-margin stretch-card">
            <div className="card card-statistics">
              <div className="card-body">
                <h1>Sprout Administration</h1>
              </div>
            </div>
          </div>
        </div>
        <PluginListComponent />
      </div> 
    );
  }
}

export default Dashboard;