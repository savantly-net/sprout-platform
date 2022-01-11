// Libraries
// Types
import {
  AppPluginMeta,
  NavModel,
  NavModelItem,
  PluginConfigPage,
  PluginDependencies,
  PluginInclude,
  PluginIncludeType,
  PluginMeta,
  PluginMetaInfo,
  PluginType,
  SproutPlugin,
  UrlQueryMap
} from '@savantly/sprout-api';
import { Tooltip } from '@sprout-platform/ui';
// import { Tooltip } from '@savantly/sprout-ui';
import { Icon } from '@sprout-platform/ui';
import { css } from 'emotion';
import find from 'lodash/find';
import React, { ComponentProps, Fragment, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, Route, Routes, useParams, useSearchParams } from 'react-router-dom';
import { Alert } from 'reactstrap';
import Page from '../../core/components/Page/Page';
import { PluginHelp } from '../../core/components/PluginHelp/PluginHelp';
import config from '../../core/config';
import { getNotFoundNav } from '../../core/nav_model_srv';
import { StoreState } from '../../types';
import { PluginDashboards } from './PluginDashboards';
import { getPluginSettings } from './PluginSettings';
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
      return importAppPlugin(info as AppPluginMeta) as any;
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

const PAGE_ID_README = 'readme';
const PAGE_ID_DASHBOARDS = 'dashboards';

const PluginPage = () => {
  const [loading, setLoading] = useState(true);
  const [nav, setNav] = useState(getLoadingNav());
  const [defaultPage, setDefaultPage] = useState(PAGE_ID_README);
  const [plugin, setPlugin] = useState(undefined as SproutPlugin | undefined);
  const [fetchingPlugin, setFetchingPlugin] = useState(false);
  const pluginId = useParams().pluginId;
  const [q] = useSearchParams();
  const qPage = q.get('page');

  const getQuery = () => {
    const query: UrlQueryMap = {};
    q.forEach((val, key) => {
      query.key = val;
    });
    return query;
  };

  useMemo(() => {
    if (!fetchingPlugin && !plugin) {
      loadPlugin(pluginId)
        .then((response) => {
          setPlugin(response);
        })
        .catch((err) => {
          setNav(getNotFoundNav());
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (!!plugin) {
      const query = getQuery();
      const { defaultPage, nav } = getPluginTabsNav(plugin, config.appSubUrl, '', query, true);
      setDefaultPage(defaultPage);
      setNav(nav);
      setLoading(false);
    }
  }, [plugin, fetchingPlugin, q, setFetchingPlugin, setDefaultPage, setNav, setLoading]);

  useMemo(() => {
    if (!!plugin) {
      if (qPage) {
        const node = {
          ...nav.node,
          children: setActivePage(qPage, nav.node?.children || [], defaultPage)
        };
        setNav({
          node: node,
          main: node
        });
      }
    }
  }, [plugin, q, nav, defaultPage, setNav]);

  const renderBody = () => {
    const query = getQuery();

    if (!plugin) {
      return <Alert color="warning" title="Plugin Not Found" />;
    }

    const active = nav.main.children && nav.main.children.find((tab) => tab.active);
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
  };

  const showUpdateInfo = () => {
    console.log('show update instructions');
  };

  const Section = (props: ComponentProps<any>) => {
    return <section className="mb-2">{props.children}</section>;
  };

  const renderVersionInfo = (meta: PluginMeta) => {
    if (!meta.info.version) {
      return null;
    }

    return (
      <Section>
        <h5>Version</h5>
        <span>{meta.info.version}</span>
        {meta.hasUpdate && (
          <div>
            <Tooltip content={meta.latestVersion!} theme="info" placement="top">
              <a href="javascript:;" onClick={showUpdateInfo}>
                Update Available!
              </a>
            </Tooltip>
          </div>
        )}
      </Section>
    );
  };

  const renderSidebarIncludeBody = (item: PluginInclude) => {
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
  };

  const renderSidebarIncludes = (includes?: PluginInclude[]) => {
    if (!includes || !includes.length) {
      return null;
    }

    return (
      <Section>
        <h5>Includes</h5>
        <ul>
          {includes.map((include) => {
            return (
              <li className={linkListItemStyle} key={include.name}>
                {renderSidebarIncludeBody(include)}
              </li>
            );
          })}
        </ul>
      </Section>
    );
  };

  const renderConfigurationPageRoutes = (configPages: PluginConfigPage<PluginMeta<{}>>[] | undefined) => {
    if (plugin && configPages) {
      const routes = configPages.map((p) => {
        const C = p.body;
        return <Route key={p.id} path={`${p.id}/*`} element={<C plugin={plugin} query={{}} />} />;
      });
      return (
        <Fragment>
          <Routes>{routes}</Routes>
        </Fragment>
      );
    }
  };

  const renderConfigurationPageLinks = (configPages: PluginConfigPage<PluginMeta<{}>>[] | undefined) => {
    if (plugin && configPages) {
      return (
        <Section>
          <h5>Configuration</h5>
          <ul>
            {configPages.map((p) => {
              return (
                <li className={linkListItemStyle} key={p.id}>
                  {
                    <NavLink key={p.id} to={`./${p.id}`}>
                      <Icon name={p.icon || 'cog'} className="mr-1" />
                      {p.title}
                    </NavLink>
                  }
                </li>
              );
            })}
          </ul>
        </Section>
      );
    }
  };

  const renderSidebarDependencies = (dependencies?: PluginDependencies) => {
    if (!dependencies) {
      return null;
    }

    return (
      <Section>
        <h5>Dependencies</h5>
        <ul>
          <li className={linkListItemStyle}>
            <img src="/favicon.png" alt="favicon" width="20px" className="mr-1" />
            Sprout {dependencies.sproutVersion}
          </li>
          {dependencies.plugins &&
            dependencies.plugins.map((plug) => {
              return (
                <li className={linkListItemStyle} key={plug.name}>
                  <i className={getPluginIcon(plug.type)} />
                  {plug.name} {plug.version}
                </li>
              );
            })}
        </ul>
      </Section>
    );
  };

  const renderSidebarLinks = (info: PluginMetaInfo) => {
    if (!info.links || !info.links.length) {
      return null;
    }

    return (
      <Section>
        <h5>Links</h5>
        <ul>
          {info.links.map((link) => {
            return (
              <li className={linkListItemStyle} key={link.url}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>
      </Section>
    );
  };

  return (
    <Routes>
      <Route>
        <Page navModel={nav}>
          <Page.Contents isLoading={loading}>
            {plugin && (
              <div className="d-flex">
                <div className="col">
                  {plugin.loadError && (
                    <Alert
                      color="warning"
                      title="Error Loading Plugin"
                      children={
                        <>
                          Check the server startup logs for more information. <br />
                          If this plugin was loaded from git, make sure it was compiled.
                        </>
                      }
                    />
                  )}
                  {renderBody()}
                </div>
                <aside className="col-3">
                  <Section>
                    {renderVersionInfo(plugin.meta)}
                    {renderConfigurationPageLinks(plugin.configPages)}
                    {renderSidebarIncludes(plugin.meta.includes)}
                    {renderSidebarDependencies(plugin.meta.dependencies)}
                    {renderSidebarLinks(plugin.meta.info)}
                  </Section>
                </aside>
              </div>
            )}
          </Page.Contents>
        </Page>
      </Route>
      <Routes>{plugin && renderConfigurationPageRoutes(plugin.configPages)}</Routes>
    </Routes>
  );
};

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
    url: `${appSubUrl}${path}`
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
      return 'database';
    case 'panel':
      return 'solar-panel';
    case 'app':
      return 'apps';
    case 'page':
      return 'file';
    case 'dashboard':
      return 'gicon gicon-dashboard';
    default:
      return 'icon-gf icon-gf-apps';
  }
}

const linkListItemStyle = css`
  list-style: none;
`;

const mapStateToProps = (state: StoreState) => ({
  query: state.location.query
});

export default connect(mapStateToProps)(PluginPage);
