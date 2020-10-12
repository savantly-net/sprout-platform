import _ from 'lodash';

import { getPluginSettings } from './PluginSettingsCache';
import { PluginMeta, AppEvents, NavModelItem } from '@savantly/sprout-api';
import { getNotFoundNav, NavModelSrv } from '../../core/nav_model_srv';
import { Component, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import appEvents from '../../core/app_events';
import { connect } from 'react-redux';
import { StoreState } from '../../types';
import React from 'react';
import PageHeader from '../../core/components/PageHeader/PageHeader';
import { Footer } from '../../core/components/Footer/Footer';

interface OwnProps extends RouteComponentProps<any> {}
interface ConnectedProps {
  navItems: NavModelItem[];
}
type AllProps = OwnProps & ConnectedProps;

const mapStateToProps = (state: StoreState) => ({
  navItems: state.navTree.items
});

export class AppPage extends Component<AllProps> {
  navModelSrv: NavModelSrv;
  page: any;
  pluginId: any;
  appModel: any;
  navModel: any;

  constructor(props: AllProps) {
    super(props);
    this.pluginId = props.match.params.pluginId;
    this.navModelSrv = new NavModelSrv({ navItems: props.navItems });

    Promise.resolve(getPluginSettings(this.pluginId))
      .then((settings) => {
        this.initPage(settings);
      })
      .catch((err) => {
        appEvents.emit(AppEvents.alertError, ['Unknown Plugin']);
        this.navModel = getNotFoundNav();
      });
  }

  initPage(app: PluginMeta) {
    this.appModel = app;
    this.page = _.find(app.includes, { slug: this.props.match.params.slug });

    if (!this.page) {
      appEvents.emit(AppEvents.alertError, ['App Page Not Found']);
      this.navModel = getNotFoundNav();
      return;
    }
    if (app.type !== 'app' || !app.enabled) {
      appEvents.emit(AppEvents.alertError, ['Application Not Enabled']);
      this.navModel = getNotFoundNav();
      return;
    }

    const pluginNav = this.navModelSrv.getNav('plugin-page-' + app.id);

    this.navModel = {
      main: {
        img: app.info.logos.large,
        subTitle: app.name,
        url: '',
        text: this.page.name,
        breadcrumbs: [{ title: app.name, url: pluginNav.main.url }]
      }
    };
  }

  render() {
    return (
      <Fragment>
        {this.navModel && (
          <Fragment>
            <PageHeader model={this.navModel} />
            <div className="page-container">{this.page}</div>
            <Footer />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(AppPage);
