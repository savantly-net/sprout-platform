import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { Route } from 'react-router-dom';
import { StoreState } from '../../types';
import AppRootPage from './AppRootPage';
import PluginListPage from './PluginListPage';
import PluginPage from './PluginPage';

const PluginRoutes = () => {
  const plugins = useSelector((state: StoreState) => state.plugins.plugins);
  const params = useParams<any>();
  const location = useLocation();
  return (
    <>
    </>
  );
};

export default PluginRoutes;
