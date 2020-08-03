import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

class Navbar extends Component {
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas')?.classList.toggle('active');
  }
  render () { 
    return (
      <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
        <Link to="/" className="navbar-brand brand-logo-mini align-self-center d-lg-none"><img src={require("../../assets/images/favicon.png")} alt="logo" /></Link>
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
            <i className="mdi mdi-menu"></i>
          </button>
          <ul className="navbar-nav navbar-nav-left header-links">
            {/* example link for header nav bar}
            <li className="nav-item d-none d-md-flex">
              <a href="https://github.com/savantly-net/sprout-platform" target="_sprout" className="nav-link">Documentation</a>
            </li>
            {*/}
          </ul>
          <div className="navbar-nav flex-fill">{/* empty center div */}</div>
          <ul className="navbar-nav navbar-nav-right ml-lg-auto">
            <li className="nav-item  nav-profile border-0">
              <Dropdown alignRight>
                <Dropdown.Toggle id="settingsDropDown" className="nav-link count-indicator p-0 toggle-arrow-hide bg-transparent">
                  <i className="fa fa-gears"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="navbar-dropdown preview-list">
                  <Dropdown.Item className="dropdown-item  d-flex align-items-center" href="!#" onClick={(evt:any) =>evt.preventDefault()}>
                    <p className="mb-0 font-weight-medium float-left">Settings </p>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={this.toggleOffcanvas}>
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
