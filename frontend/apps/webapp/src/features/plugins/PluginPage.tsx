// Libraries
// Types
import {
  NavModel,
  NavModelItem,
  PluginDependencies,
  PluginInclude,
  PluginIncludeType,
  PluginMeta,
  PluginMetaInfo,
  PluginType,
  SproutPlugin,
  UrlQueryMap
} from '@savantly/sprout-api';
import { Alert, Tooltip } from '@savantly/sprout-ui';
import find from 'lodash/find';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appEvents } from '../../core/app_events';
import Page from '../../core/components/Page/Page';
import { PluginHelp } from '../../core/components/PluginHelp/PluginHelp';
import config from '../../core/config';
import { getNotFoundNav } from '../../core/nav_model_srv';
import { AppNotificationSeverity, CoreEvents, StoreState } from '../../types';
import { PluginDashboards } from './PluginDashboards';
import { getPluginSettings } from './PluginSettingsCache';
import { importAppPlugin, importPanelPlugin } from './plugin_loader';

export function getLoadingNav(): NavModel {
  const node = {
    text: 'Loading...',
    icon: 'icon-gf icon-gf-panel'
  };
  return {
    node: node,
    main: node
  };
}

export function loadPlugin(pluginId: string): Promise<SproutPlugin> {
  return getPluginSettings(pluginId).then((info) => {
    if (info.type === PluginType.app) {
      return importAppPlugin(info) as any;
    }
    if (info.type === PluginType.panel) {
      return importPanelPlugin(pluginId).then((plugin) => {
        // Panel Meta does not have the *full* settings meta
        return getPluginSettings(pluginId).then((meta) => {
          plugin.meta = {
            ...meta, // Set any fields that do not exist
            ...plugin.meta
          };
          return plugin;
        });
      });
    }
    return Promise.reject('Unknown Plugin type: ' + info.type);
  });
}

interface OwnProps {
  pluginId: string;
  path: string; // the URL path
}
interface ConnectedProps {
  query: UrlQueryMap;
}

interface State {
  loading: boolean;
  plugin?: SproutPlugin;
  nav: NavModel;
  defaultPage: string; // The first configured one or readme
}

const PAGE_ID_README = 'readme';
const PAGE_ID_DASHBOARDS = 'dashboards';

class PluginPage extends Component<OwnProps & ConnectedProps, State> {
  constructor(props: OwnProps & ConnectedProps) {
    super(props);
    this.state = {
      loading: true,
      nav: getLoadingNav(),
      defaultPage: PAGE_ID_README
    };
  }

  async componentDidMount() {
    const { query, pluginId, path } = this.props;
    const { appSubUrl } = config;

    const plugin = await loadPlugin(pluginId);
    if (!plugin) {
      this.setState({
        loading: false,
        nav: getNotFoundNav()
      });
      return; // 404
    }

    // TODO: pass false for non-privileged user
    const { defaultPage, nav } = getPluginTabsNav(plugin, appSubUrl, path, query, true);

    this.setState({
      loading: false,
      plugin,
      defaultPage,
      nav
    });
  }

  componentDidUpdate(prevProps: OwnProps & ConnectedProps) {
    const prevPage = prevProps.query.page as string;
    const page = this.props.query.page as string;

    if (prevPage !== page) {
      const { nav, defaultPage } = this.state;
      const node = {
        ...nav.node,
        children: setActivePage(page, nav.node.children!, defaultPage)
      };

      this.setState({
        nav: {
          node: node,
          main: node
        }
      });
    }
  }

  renderBody() {
    const { plugin, nav } = this.state;
    const { query } = this.props;

    if (!plugin) {
      return <Alert severity={AppNotificationSeverity.Error} title="Plugin Not Found" />;
    }

    const active = nav.main.children!.find((tab) => tab.active);
    if (active) {
      // Find the current config tab
      if (plugin.configPages) {
        for (const tab of plugin.configPages) {
          if (tab.id === active.id) {
            return <tab.body plugin={plugin} query={query} />;
          }
        }
      }

      // Apps have some special behavior
      if (plugin.meta.type === PluginType.app) {
        if (active.id === PAGE_ID_DASHBOARDS) {
          return <PluginDashboards plugin={plugin.meta} />;
        }
      }
    }

    return <PluginHelp plugin={plugin.meta} type="help" />;
  }

  showUpdateInfo = () => {
    appEvents.emit(CoreEvents.showModal, {
      src: 'features/plugins/partials/update_instructions.html',
      model: this.state.plugin!.meta
    });
  };

  renderVersionInfo(meta: PluginMeta) {
    if (!meta.info.version) {
      return null;
    }

    return (
      <section className="page-sidebar-section">
        <h4>Version</h4>
        <span>{meta.info.version}</span>
        {meta.hasUpdate && (
          <div>
            <Tooltip content={meta.latestVersion!} theme="info" placement="top">
              <a href="#" onClick={this.showUpdateInfo}>
                Update Available!
              </a>
            </Tooltip>
          </div>
        )}
      </section>
    );
  }

  renderSidebarIncludeBody(item: PluginInclude) {
    if (item.type === PluginIncludeType.page) {
      return (
        <a href={item.path}>
          <i className={getPluginIcon(item.type)} />
          {item.name}
        </a>
      );
    }
    return (
      <>
        <i className={getPluginIcon(item.type)} />
        {item.name}
      </>
    );
  }

  renderSidebarIncludes(includes?: PluginInclude[]) {
    if (!includes || !includes.length) {
      return null;
    }

    return (
      <section className="page-sidebar-section">
        <h4>Includes</h4>
        <ul className="ui-list plugin-info-list">
          {includes.map((include) => {
            return (
              <li className="plugin-info-list-item" key={include.name}>
                {this.renderSidebarIncludeBody(include)}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  renderSidebarDependencies(dependencies?: PluginDependencies) {
    if (!dependencies) {
      return null;
    }

    return (
      <section className="page-sidebar-section">
        <h4>Dependencies</h4>
        <ul className="ui-list plugin-info-list">
          <li className="plugin-info-list-item">
            <img src="/favicon.png" alt='favicon' />
            Sprout {dependencies.sproutVersion}
          </li>
          {dependencies.plugins &&
            dependencies.plugins.map((plug) => {
              return (
                <li className="plugin-info-list-item" key={plug.name}>
                  <i className={getPluginIcon(plug.type)} />
                  {plug.name} {plug.version}
                </li>
              );
            })}
        </ul>
      </section>
    );
  }

  renderSidebarLinks(info: PluginMetaInfo) {
    if (!info.links || !info.links.length) {
      return null;
    }

    return (
      <section className="page-sidebar-section">
        <h4>Links</h4>
        <ul className="ui-list">
          {info.links.map((link) => {
            return (
              <li key={link.url}>
                <a href={link.url} className="external-link" target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  render() {
    const { loading, nav, plugin } = this.state;

    // TODO: get from context
    const isAdmin = true;

    return (
      <Page navModel={nav}>
        <Page.Contents isLoading={loading}>
          {plugin && (
            <div className="sidebar-container">
              <div className="sidebar-content">
                {plugin.loadError && (
                  <Alert
                    severity={AppNotificationSeverity.Error}
                    title="Error Loading Plugin"
                    children={
                      <>
                        Check the server startup logs for more information. <br />
                        If this plugin was loaded from git, make sure it was compiled.
                      </>
                    }
                  />
                )}
                {this.renderBody()}
              </div>
              <aside className="page-sidebar">
                <section className="page-sidebar-section">
                  {this.renderVersionInfo(plugin.meta)}
                  {isAdmin && this.renderSidebarIncludes(plugin.meta.includes)}
                  {this.renderSidebarDependencies(plugin.meta.dependencies)}
                  {this.renderSidebarLinks(plugin.meta.info)}
                </section>
              </aside>
            </div>
          )}
        </Page.Contents>
      </Page>
    );
  }
}

function getPluginTabsNav(
  plugin: SproutPlugin,
  appSubUrl: string,
  path: string,
  query: UrlQueryMap,
  isAdmin: boolean
): { defaultPage: string; nav: NavModel } {
  const { meta } = plugin;
  let defaultPage: string | undefined;
  const pages: NavModelItem[] = [];

  if (true) {
    pages.push({
      text: 'Readme',
      icon: 'fa fa-fw fa-file-text-o',
      url: `${appSubUrl}${path}?page=${PAGE_ID_README}`,
      id: PAGE_ID_README
    });
  }

  // We allow non admins to see plugins but only their readme. Config is hidden even though the API needs to be
  // public for plugins to work properly.
  if (isAdmin) {
    // Only show Config/Pages for app
    if (meta.type === PluginType.app) {
      if (plugin.configPages) {
        for (const page of plugin.configPages) {
          pages.push({
            text: page.title,
            icon: page.icon,
            url: `${appSubUrl}${path}?page=${page.id}`,
            id: page.id
          });

          if (!defaultPage) {
            defaultPage = page.id;
          }
        }
      }

      // Check for the dashboard pages
      if (find(meta.includes, { type: PluginIncludeType.dashboard })) {
        pages.push({
          text: 'Dashboards',
          icon: 'gicon gicon-dashboard',
          url: `${appSubUrl}${path}?page=${PAGE_ID_DASHBOARDS}`,
          id: PAGE_ID_DASHBOARDS
        });
      }
    }
  }

  if (!defaultPage) {
    defaultPage = pages[0].id; // the first tab
  }

  const node = {
    text: meta.name,
    img: `${meta.baseUrl}/${meta.info.logos.large}`,
    subTitle: meta.info.author.name,
    breadcrumbs: [{ title: 'Plugins', url: 'plugins' }],
    url: `${appSubUrl}${path}`,
    children: setActivePage(query.page as string, pages, defaultPage!)
  };

  return {
    defaultPage: defaultPage!,
    nav: {
      node: node,
      main: node
    }
  };
}

function setActivePage(pageId: string, pages: NavModelItem[], defaultPageId: string): NavModelItem[] {
  let found = false;
  const selected = pageId || defaultPageId;
  const changed = pages.map((p) => {
    const active = !found && selected === p.id;
    if (active) {
      found = true;
    }
    return { ...p, active };
  });

  if (!found) {
    changed[0].active = true;
  }

  return changed;
}

function getPluginIcon(type: string) {
  switch (type) {
    case 'datasource':
      return 'gicon gicon-datasources';
    case 'panel':
      return 'icon-gf icon-gf-panel';
    case 'app':
      return 'icon-gf icon-gf-apps';
    case 'page':
      return 'icon-gf icon-gf-endpoint-tiny';
    case 'dashboard':
      return 'gicon gicon-dashboard';
    default:
      return 'icon-gf icon-gf-apps';
  }
}

const mapStateToProps = (state: StoreState) => ({
  query: state.location.query
});

export default connect(mapStateToProps)(PluginPage);
