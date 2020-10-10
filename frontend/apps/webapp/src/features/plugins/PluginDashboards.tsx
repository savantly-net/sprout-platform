import { AppEvents, PluginMeta } from '@savantly/sprout-api';
import { getBackendSrv } from '@savantly/sprout-runtime';
import extend from 'lodash/extend';
import React, { PureComponent } from 'react';
import { appEvents } from '../../core/app_events';
import DashboardsTable from '../datasources/DashboardsTable';
import { PluginDashboard } from '../../types';



interface Props {
  plugin: PluginMeta;
}

interface State {
  dashboards: PluginDashboard[];
  loading: boolean;
}

export class PluginDashboards extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      dashboards: [],
    };
  }

  async componentDidMount() {
    const pluginId = this.props.plugin.id;
    getBackendSrv()
      .get(`/api/plugins/${pluginId}/dashboards`)
      .then((dashboards: any) => {
        this.setState({ dashboards, loading: false });
      });
  }

  importAll = () => {
    this.importNext(0);
  };

  private importNext = (index: number) => {
    const { dashboards } = this.state;
    return this.import(dashboards[index], true).then(() => {
      if (index + 1 < dashboards.length) {
        return new Promise(resolve => {
          setTimeout(() => {
            this.importNext(index + 1).then(() => {
              resolve();
            });
          }, 500);
        });
      } else {
        return Promise.resolve();
      }
    });
  };

  import = (dash: PluginDashboard, overwrite: boolean) => {
    const { plugin } = this.props;

    const installCmd: any = {
      pluginId: plugin.id,
      path: dash.path,
      overwrite: overwrite,
      inputs: [],
    };

    return getBackendSrv()
      .post(`/api/dashboards/import`, installCmd)
      .then((res: PluginDashboard) => {
        appEvents.emit(AppEvents.alertSuccess, ['Dashboard Imported', dash.title]);
        extend(dash, res);
        this.setState({ dashboards: [...this.state.dashboards] });
      });
  };

  remove = (dash: PluginDashboard) => {
    getBackendSrv()
      .delete('/api/dashboards/' + dash.importedUri)
      .then(() => {
        dash.imported = false;
        this.setState({ dashboards: [...this.state.dashboards] });
      });
  };

  render() {
    const { loading, dashboards } = this.state;
    if (loading) {
      return <div>loading...</div>;
    }
    if (!dashboards || !dashboards.length) {
      return <div>No dashboards are included with this plugin</div>;
    }

    return (
      <div className="gf-form-group">
        <DashboardsTable dashboards={dashboards} onImport={this.import} onRemove={this.remove} />
      </div>
    );
  }
}