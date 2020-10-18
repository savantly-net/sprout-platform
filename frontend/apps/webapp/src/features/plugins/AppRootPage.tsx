// Libraries
import { AppEvents, AppPlugin, AppPluginMeta, KeyValue, NavModel, PluginType, UrlQueryMap, urlUtil } from '@savantly/sprout-api';
import { Alert } from '@savantly/sprout-ui';
import React, { FC, ReactElement, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { useInRouterContext, useLocation, useParams, useRoutes, Routes, Outlet } from 'react-router-dom';
import { appEvents } from '../../core/app_events';
import Page from '../../core/components/Page/Page';
import PageLoader from '../../core/components/PageLoader/PageLoader';
import { getExceptionNav, getNotFoundNav, getWarningNav } from '../../core/nav_model_srv';
// Types
import { StoreState } from '../../types';
import { getPluginSettings } from './PluginSettingsCache';
import { importAppPlugin } from './plugin_loader';
import { DynamicModuleLoader, IModule } from "redux-dynamic-modules";


interface Props {
  slug?: string;
}

export function getAppPluginPageError(meta: AppPluginMeta) {
  if (!meta) {
    return 'Unknown Plugin';
  }
  if (meta.type !== PluginType.app) {
    return 'Plugin must be an app';
  }
  if (!meta.enabled) {
    return 'Application Not Enabled';
  }
  return null;
}

const AppRootPage: FC<Props> = ({
}) => {

  const params = useParams();
  const location = useLocation();
  const [plugin, setPlugin] = useState<AppPlugin<KeyValue<any>> | null>();
  const [nav, setNav] = useState<NavModel | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [routes, setRoutes] = useState<ReactElement>();
  const [routesLoaded, setRoutesLoaded] = useState<boolean>(false);
  const [appPluginState, setAppPluginState] = useState<IModule<any> | null>();

  useMemo(() => {
    try {
      getPluginSettings(params.pluginId).then((info) => {
        const error = getAppPluginPageError(info);
        if (error) {
          appEvents.emit(AppEvents.alertError, [error]);
          setNav(getWarningNav(error));
          return null;
        }
        importAppPlugin(info).then(app => {
          //@ts-ignore
          if (app.stateModule){
            //@ts-ignore
            setAppPluginState(app.stateModule());
          }
          setPlugin(app);
          setLoading(false);
        });
      });
    } catch (err) {
      setPlugin(null);
      setLoading(false);
      setNav(process.env.NODE_ENV === 'development' ? getExceptionNav(err) : getNotFoundNav());
    }
  }, [params.pluginId]);

  const onNavChanged = (nav: NavModel) => {
    setNav(nav);
  };

  //@ts-ignore
  const pluginRoutes = useRoutes((plugin?.routes && plugin.routes({
    meta: plugin.meta,
    query: urlUtil.getUrlSearchParams(),
    path: `/a/${plugin.meta.id}`,
    params,
    onNavChanged
  })) || []);
  if (pluginRoutes && !routesLoaded) {
    setRoutesLoaded(true);
    setRoutes(pluginRoutes);
  }

  const routesOrRoot = () => {
    if (!plugin) {
      return <PageLoader />;
    } else if (routesLoaded) {
      return routes!;
    } else if (plugin && plugin.root) {
      return (<plugin.root meta={plugin.meta} query={urlUtil.getUrlSearchParams()} path={location.pathname} onNavChanged={onNavChanged} />);
    } else {
      return (
      <Alert title="App Plugin Error" severity="error">
        <h3>No Routes or Root page has been provided in the App Plugin</h3>
      </Alert>
      );
    }
  };

  const withStateWrapper = (element: ReactElement) => {
    if (appPluginState) {
      return (
        <DynamicModuleLoader modules={[appPluginState]}>
          {element}
        </DynamicModuleLoader>);
    } else {
      return element;
    }
  }

  const withPageWrapper = (element: ReactElement) => {
    if (nav) {
      return (
        <Page navModel={nav}>
          <Page.Contents isLoading={loading}>
            {element}
          </Page.Contents>
        </Page>
      );
    } else {
      return element;
    }
  }

  return (
    <>
     {withStateWrapper(withPageWrapper(routesOrRoot()))}
    </>
    
  );
}

const mapStateToProps = (state: StoreState) => ({
});

export default connect(mapStateToProps)(AppRootPage);
