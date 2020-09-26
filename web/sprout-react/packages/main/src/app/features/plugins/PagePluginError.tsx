// Libraries
import _ from 'lodash';
import React, { PureComponent, ReactNode } from 'react';

// Types
import { AppNotificationSeverity } from '../../types';
import { Alert } from '@grafana/ui';
import { PageProps, PagePlugin, PluginType, PagePluginMeta } from '@savantly/sprout-api';

interface Props {
  title: string;
  text?: ReactNode;
}

class PagePluginError extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const style = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    };

    return (
      <div style={style}>
        <Alert severity={AppNotificationSeverity.Error} {...this.props} />
      </div>
    );
  }
}

export function getPagePluginLoadError(meta: PagePluginMeta, err: any): PagePlugin {
  const LoadError = class LoadError extends PureComponent<PageProps> {
    render() {
      const text = (
        <>
          Check the server startup logs for more information. <br />
          If this plugin was loaded from git, make sure it was compiled.
        </>
      );
      return <PagePluginError title={`Error loading: ${meta.id}`} text={text} />;
    }
  };
  const plugin = new PagePlugin(LoadError);
  plugin.meta = meta;
  plugin.loadError = true;
  return plugin;
}

export function getPagePluginNotFound(id: string): PagePlugin {
  const NotFound = class NotFound extends PureComponent<PageProps> {
    render() {
      return <PagePluginError title={`Page plugin not found: ${id}`} />;
    }
  };

  const plugin = new PagePlugin(NotFound);
  plugin.meta = {
    id: id,
    name: id,
    sort: 100,
    type: PluginType.page,
    module: '',
    baseUrl: '',
    info: {
      author: {
        name: '',
      },
      description: '',
      links: [],
      logos: {
        large: '',
        small: '',
      },
      screenshots: [],
      updated: '',
      version: '',
    },
  };
  return plugin;
}