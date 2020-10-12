// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Types
import { StoreState } from '../../types';
import { AppEvents, AppPlugin, AppPluginMeta, NavModel, PluginType, UrlQueryMap } from '@savantly/sprout-api';

import Page from '../../core/components/Page/Page';
import { getPluginSettings } from './PluginSettingsCache';
import { importAppPlugin } from './plugin_loader';
import { getNotFoundNav, getWarningNav, getExceptionNav } from '../../core/nav_model_srv';
import { appEvents } from '../../core/app_events';
import PageLoader from '../../core/components/PageLoader/PageLoader';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<any> {
  query: UrlQueryMap;
  path: string;
  slug?: string;
}

interface State {
  pluginId: string;
  loading: boolean;
  plugin?: AppPlugin | null;
  nav?: NavModel;
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

class AppRootPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      pluginId: props.match.params.pluginId
    };
  }

  async componentDidMount() {
    const { pluginId } = this.state;

    try {
      const app = await getPluginSettings(pluginId).then((info) => {
        const error = getAppPluginPageError(info);
        if (error) {
          appEvents.emit(AppEvents.alertError, [error]);
          this.setState({ nav: getWarningNav(error) });
          return null;
        }
        return importAppPlugin(info);
      });
      this.setState({ plugin: app, loading: false });
    } catch (err) {
      this.setState({
        plugin: null,
        loading: false,
        nav: process.env.NODE_ENV === 'development' ? getExceptionNav(err) : getNotFoundNav()
      });
    }
  }

  onNavChanged = (nav: NavModel) => {
    this.setState({ nav });
  };

  render() {
    const { path, query } = this.props;
    const { loading, plugin, nav } = this.state;

    if (plugin && !plugin.root) {
      // TODO? redirect to plugin page?
      return <div>No Root App</div>;
    }

    // When no naviagion is set, give full control to the app plugin
    if (!nav) {
      if (plugin && plugin.root) {
        return <plugin.root meta={plugin.meta} query={query} path={path} onNavChanged={this.onNavChanged} />;
      }
      return <PageLoader />;
    }

    return (
      <Page navModel={nav}>
        <Page.Contents isLoading={loading}>
          {plugin && plugin.root && (
            <plugin.root meta={plugin.meta} query={query} path={path} onNavChanged={this.onNavChanged} />
          )}
        </Page.Contents>
      </Page>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  slug: state.location.routeParams.slug as string,
  query: state.location.query,
  path: state.location.path
});

export default connect(mapStateToProps)(AppRootPage);
