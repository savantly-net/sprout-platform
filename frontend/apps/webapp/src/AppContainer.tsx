import { ErrorBoundaryAlert } from '@savantly/sprout-ui';
import React, { createRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.css';
import { SideMenu } from './core/components/sidemenu/SideMenu';
import { initDevFeatures } from './dev';

export const AppContainer = ({ theme }: { theme: string }) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    initDevFeatures();
  }
  const appElem = createRef<HTMLDivElement>();

  return (
    <React.Fragment>
      <SideMenu></SideMenu>
      <div ref={appElem} className="main-view">
        <div className="scroll-canvas">
          <BrowserRouter>
            <ErrorBoundaryAlert style="page">
              <App theme={theme} />
            </ErrorBoundaryAlert>
          </BrowserRouter>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
