import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MenuItem from '../components/MenuItem';
import { connect } from 'react-redux';

class Sidebar extends Component {
  
  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <a className="sidebar-brand brand-logo" href="index.html"><img src={require("../../assets/images/logo.png")} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini pt-3" href="index.html"><img src={require("../../assets/images/favicon.png" )} alt="logo" /></a>
        </div>
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="https://github.com/savantly-net/sprout-platform" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-book menu-icon" ></i>
                <span className="menu-title">Documentation</span>
            </a>
          </li>
          {this.props.data.map(({linkTo, title, cssClassName}) => (
            <MenuItem key={title} active={this.isPathActive(linkTo)} title={title} cssClassName={cssClassName} linkTo={linkTo} />
          ))}
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

const mapStateToProps = state => ({
  data: state.sidebarItems
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar))
