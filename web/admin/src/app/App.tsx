import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './layout/Navbar';
import Sidebar from './layout/Sidebar';
import Footer from './layout/Footer';
import { hasAnyAuthority } from "./components/auth/private-route";
import { IRootState } from "./state/reducers/";
import { getSession } from './state/reducers/authentication';
import { getProfile } from './state/reducers/application-profile';
import { AUTHORITIES } from "./config/constants";
import ErrorBoundary from './components/error/error-boundary';

const baseHref = document.querySelector('base')?.getAttribute('href')?.replace(/\/$/, '') || '/';

export interface IAppProps extends StateProps, DispatchProps {}

export const App = (props: IAppProps) => {
  useEffect(() => {
    props.getSession();
    props.getProfile();
  });

  return (
    <BrowserRouter basename={baseHref}>
      <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
      <div className="container-scroller">
        <ErrorBoundary>
          <Navbar/> 
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
              <Footer/>  
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </BrowserRouter>
    
  );
}

//export default withRouter(App);

const mapStateToProps = ({ authentication, applicationProfile }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled,
});

const mapDispatchToProps = { getSession, getProfile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(App);