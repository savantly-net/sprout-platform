import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Button } from 'react-bootstrap';
import { useOktaAuth } from '@okta/okta-react';
import { useSelector } from 'react-redux';
import { IRootState } from '../state/reducers';

const Navbar = () => {
  const { authState, authService } = useOktaAuth();
  const appSettings = useSelector((state: IRootState) => state.appSettings);

  const login = async () => authService.login('/');
  const logout = async () => authService.logout('/');

  const toggleOffcanvas = () => {
    document.querySelector('.sidebar-offcanvas')?.classList.toggle('active');
  };
  return (
    <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
        <Link to="/" className="navbar-brand brand-logo-mini align-self-center d-lg-none">
          <img src={appSettings.getValueByName('WEB_SITE_FAVICON_URL')} alt="logo" />
        </Link>
        <Button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          onClick={() => document.body.classList.toggle('sidebar-icon-only')}
        >
          <i className="mdi mdi-menu"></i>
        </Button>
        <ul className="navbar-nav navbar-nav-left header-links">
            
        </ul>
        <div className="navbar-nav flex-fill">{/* empty center div */}</div>
        <ul className="navbar-nav navbar-nav-right ml-lg-auto">
          {!authState.isPending && !authState.isAuthenticated && (
            <>
              <li className="nav-item  nav-profile border-0">
                <Button onClick={login}>Login</Button>
              </li>
            </>
          )}
          {authState.isAuthenticated && false && (
            <>
              <li className="nav-item  nav-profile border-0">
                <Dropdown alignRight>
                  <Dropdown.Toggle id="settingsDropDown" className="nav-link count-indicator p-0 toggle-arrow-hide bg-transparent">
                    <i className="fa fa-gears"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="navbar-dropdown preview-list">
                    <Dropdown.Item
                      className="dropdown-item  d-flex align-items-center"
                      href="!#"
                      onClick={(evt: any) => evt.preventDefault()}
                    >
                      <p className="mb-0 font-weight-medium float-left">Settings </p>
                    </Dropdown.Item>
                    <div className="dropdown-divider"></div>
                    <Dropdown.Item>
                      <Button className="btn btn-primary" id="logout-button" onClick={logout}>
                        Logout
                      </Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </>
          )}
        </ul>
        {authState.isAuthenticated && (
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleOffcanvas}>
            <span className="mdi mdi-menu"></span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
