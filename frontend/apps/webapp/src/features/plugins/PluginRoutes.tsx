import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { StoreState } from '../../types';
import AppPage from './AppPage';
import AppRootPage from './AppRootPage';
import PluginListPage from './PluginListPage';
import PluginPage from './PluginPage';

const PluginRoutes = () => {
  const plugins = useSelector((state: StoreState) => state.plugins.plugins);
  return (
    <>
      <Route exact path="/a/:pluginId" render={(props) => <AppRootPage {...props} />} />
      <Route exact path="/plugins" render={(props) => <PluginListPage plugins={plugins} />} />
      <Route exact path="/plugins/:pluginId" render={(props) => <PluginPage {...props} />} />
      <Route exact path="/plugins/:pluginId/page/:slug" render={(props) => <AppPage {...props} />} />
    </>
  );
};

export default PluginRoutes;
