// Libraries
import { AppEvents, AppPlugin, AppPluginMeta, KeyValue, NavModel, PluginType, urlUtil } from '@savantly/sprout-api';
import { Alert } from '@savantly/sprout-ui';
import React, { FC, ReactElement, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { appEvents } from '../../core/app_events';
import Page from '../../core/components/Page/Page';
import PageLoader from '../../core/components/PageLoader/PageLoader';
import { getExceptionNav, getNotFoundNav, getWarningNav } from '../../core/nav_model_srv';
// Types
import { StoreState } from '../../types';
import { getPluginSettings } from './PluginSettings';
import { importAppPlugin } from './plugin_loader';

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

const AppRootPage: FC<Props> = ({}) => {
  const params = useParams();
  const [plugin, setPlugin] = useState<AppPlugin<KeyValue<any>> | null>();
  const [nav, setNav] = useState<NavModel | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const appPath = `/a/${params['pluginId']}`;

  useMemo(() => {
    try {
      getPluginSettings(params.pluginId).then((info) => {
        const pluginInfo = info as AppPluginMeta<KeyValue<any>>;
        const error = getAppPluginPageError(pluginInfo);
        if (error) {
          appEvents.emit(AppEvents.alertError, [error]);
          setNav(getWarningNav(error));
          return null;
        }
        importAppPlugin(pluginInfo).then((app) => {
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

  const getRoot = () => {
    if (!plugin) {
      return <PageLoader />;
    } else if (plugin && plugin.root) {
      return (
        <plugin.root
          meta={plugin.meta}
          query={urlUtil.getUrlSearchParams()}
          path={appPath}
          onNavChanged={onNavChanged}
        />
      );
    } else {
      return (
        <Alert title="App Plugin Error" severity="error">
          <h3>No Routes or Root page has been provided in the App Plugin</h3>
        </Alert>
      );
    }
  };

  const withPageWrapper = (element: ReactElement) => {
    if (nav) {
      return (
        <Page navModel={nav}>
          <Page.Contents isLoading={loading}>{element}</Page.Contents>
        </Page>
      );
    } else {
      return element;
    }
  };

  return <>{withPageWrapper(getRoot())}</>;
};

const mapStateToProps = (state: StoreState) => ({});

export default connect(mapStateToProps)(AppRootPage);
