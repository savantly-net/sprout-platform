// Libraries
// Types
import { PanelPlugin, PanelPluginMeta, PanelProps, PluginType } from '@savantly/sprout-api';
/* eslint-disable */
import React, { PureComponent, ReactNode } from 'react';
/* eslint-enable */
import Alert from 'reactstrap/lib/Alert';

interface Props {
  title: string;
  text?: ReactNode;
}

class PanelPluginError extends PureComponent<Props> {
  // constructor(props: Props) {
  //   super(props);
  // }

  render() {
    const style = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    };

    return (
      <div style={style}>
        <Alert color="warning" {...this.props} />
      </div>
    );
  }
}

export function getPanelPluginLoadError(meta: PanelPluginMeta, err: any): PanelPlugin {
  const LoadError = class LoadError extends PureComponent<PanelProps> {
    render() {
      const text = (
        <>
          Check the server startup logs for more information. <br />
          If this plugin was loaded from git, make sure it was compiled.
        </>
      );
      return <PanelPluginError title={`Error loading: ${meta.id}`} text={text} />;
    }
  };
  const plugin = new PanelPlugin(LoadError);
  plugin.meta = meta;
  plugin.loadError = true;
  return plugin;
}

export function getPanelPluginNotFound(id: string): PanelPlugin {
  const NotFound = class NotFound extends PureComponent<PanelProps> {
    render() {
      return <PanelPluginError title={`Panel plugin not found: ${id}`} />;
    }
  };

  const plugin = new PanelPlugin(NotFound);
  plugin.meta = {
    id: id,
    name: id,
    sort: 100,
    type: PluginType.panel,
    module: '',
    baseUrl: '',
    info: {
      author: {
        name: ''
      },
      description: '',
      links: [],
      logos: {
        large: '',
        small: ''
      },
      screenshots: [],
      updated: '',
      version: ''
    }
  };
  return plugin;
}
