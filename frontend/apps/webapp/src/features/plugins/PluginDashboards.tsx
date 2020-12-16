import { AppEvents, PluginMeta } from '@savantly/sprout-api';
import extend from 'lodash/extend';
import React, { PureComponent } from 'react';
import { appEvents } from '../../core/app_events';
import { sproutApiSvc } from '../../core/services/sproutApiSvc';
import { PluginDashboard } from '../../types';
import DashboardsTable from '../datasources/DashboardsTable';

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
      dashboards: []
    };
  }

  async componentDidMount() {
    const pluginId = this.props.plugin.id;
    sproutApiSvc.get<PluginDashboard[]>(`/api/plugins/${pluginId}/dashboards`).then((response) => {
      this.setState({ dashboards: response.data, loading: false });
    });
  }

  importAll = () => {
    this.importNext(0);
  };

  private importNext = (index: number) => {
    const { dashboards } = this.state;
    return this.import(dashboards[index], true).then(() => {
      if (index + 1 < dashboards.length) {
        return new Promise((resolve) => {
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
      inputs: []
    };

    return sproutApiSvc.post(`/api/dashboards/import`, installCmd)
      .then((res) => {
        appEvents.emit(AppEvents.alertSuccess, ['Dashboard Imported', dash.title]);
        extend(dash, res.data);
        this.setState({ dashboards: [...this.state.dashboards] });
      });
  };

  remove = (dash: PluginDashboard) => {
    sproutApiSvc.delete('/api/dashboards/' + dash.importedUri)
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
