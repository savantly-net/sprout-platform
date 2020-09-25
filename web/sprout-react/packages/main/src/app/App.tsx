import { Security } from '@okta/okta-react';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './App.scss';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './components/auth/AuthProvider';
import { hasAnyAuthority } from './components/auth/private-route';
import ErrorBoundary from './components/error/error-boundary';
import { AUTHORITIES } from './config/constants';
import Footer from './layout/Footer';
import Navbar from './layout/Navbar';
import Sidebar from './layout/Sidebar';
import { IRootState } from './state/reducers';
import { getSession } from './state/reducers/authentication';
import { getSettings } from "./state/reducers/app-settings";
import { loadRootMenuItems } from "./state/reducers/sidebar";

const baseHref = '/';

const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;

export interface IAppProps extends StateProps, DispatchProps {}

const oktaConfig = {
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  redirect_uri: `${window.location.origin}/implicit/callback`,
  client_id: process.env.REACT_APP_OKTA_CLIENT_ID,
  scopes: ['openid', 'profile', 'email', 'groups'],
  pkce: true,
  disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
};

export const App = (props: IAppProps) => {
  useEffect(() => {
    props.getSession();
    props.getSettings();
    props.loadRootMenuItems();
  });

  return (
    <BrowserRouter basename={baseHref}>
      <Security {...oktaConfig}>
        <AuthProvider></AuthProvider>
        <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
        <div className="container-scroller">
          <ErrorBoundary>
            <Navbar />
          </ErrorBoundary>
          <div className="container-fluid page-body-wrapper">
            <ErrorBoundary>
              <Sidebar />
            </ErrorBoundary>
            <div className="main-panel">
              <div className="content-wrapper">
                <AppRoutes />
              </div>
              <ErrorBoundary>
                <Footer />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </Security>
    </BrowserRouter>
  );
};

//export default withRouter(App);

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = { getSession, getSettings, loadRootMenuItems };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(App);
