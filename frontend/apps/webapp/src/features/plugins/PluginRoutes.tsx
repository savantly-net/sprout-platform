import React from 'react';
import { Route } from 'react-router-dom';
import AppPage from './AppPage';
import AppRootPage from './AppRootPage';
import PluginPage from './PluginPage';

const PluginRoutes = () => {
  return (
    <>
      <Route exact path="/a/:pluginId" render={(props) => <AppRootPage {...props} />} />
      <Route exact path="/plugins/:pluginId/" render={(props) => <PluginPage {...props} />} />
      <Route exact path="/plugins/:pluginId/page/:slug" render={(props) => <AppPage {...props} />} />
    </>
  );
};

export default PluginRoutes;
