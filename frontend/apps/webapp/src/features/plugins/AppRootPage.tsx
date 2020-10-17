// Libraries
import { AppEvents, AppPlugin, AppPluginMeta, KeyValue, NavModel, PluginType, UrlQueryMap, urlUtil } from '@savantly/sprout-api';
import React, { FC, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { appEvents } from '../../core/app_events';
import Page from '../../core/components/Page/Page';
import PageLoader from '../../core/components/PageLoader/PageLoader';
import { getExceptionNav, getNotFoundNav, getWarningNav } from '../../core/nav_model_srv';
// Types
import { StoreState } from '../../types';
import { getPluginSettings } from './PluginSettingsCache';
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

const AppRootPage: FC<Props> = ({
}) => {

  const params = useParams();
  const location = useLocation();
  const [plugin, setPlugin] = useState<AppPlugin<KeyValue<any>> | null>();
  const [nav, setNav] = useState<NavModel | null>();
  const [loading, setLoading] = useState<boolean>(true);

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

  if (plugin && !plugin.root) {
    // TODO? redirect to plugin page?
    return <div>No Root App</div>;
  }

  // When no navigation is set, give full control to the app plugin
  if (!nav) {
    if (plugin && plugin.root) {
      return <plugin.root meta={plugin.meta} query={urlUtil.getUrlSearchParams()} path={location.pathname} onNavChanged={onNavChanged} />;
    }
    return <PageLoader />;
  }

  return (
    <Page navModel={nav}>
      <Page.Contents isLoading={loading}>
        {plugin && plugin.root && (
          <plugin.root meta={plugin.meta} query={urlUtil.getUrlSearchParams()} path={location.pathname} onNavChanged={onNavChanged} />
        )}
      </Page.Contents>
    </Page>
  );
}

const mapStateToProps = (state: StoreState) => ({
  slug: state.location.routeParams.slug as string,
  query: state.location.query,
  path: state.location.path
});

export default connect(mapStateToProps)(AppRootPage);
