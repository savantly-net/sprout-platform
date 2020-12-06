// Libraries
import { UrlQueryValue, urlUtil } from '@savantly/sprout-api';
import { getLocationSrv } from '@savantly/sprout-runtime';
import { CustomScrollbar } from '@savantly/sprout-ui';
// @ts-ignore
import $ from 'jquery';
import React, { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { notifyApp } from '../../../core/actions';
import { Branding } from '../../../core/components/Branding/Branding';
import LifecycleLogging, { LogFlags } from '../../../core/components/LifecycleLogging/LifecycleLogging';
import { PrivateComponent } from '../../../core/components/PrivateComponent/PrivateComponent';
// Services & Utils
import { createErrorNotification } from '../../../core/copy/appNotification';
import { LocationUpdateService } from '../../../core/services/locationSvc';
// Types
import { StoreState } from '../../../types';
import { DashboardSettings } from '../components/DashboardSettings';
import { DashNav } from '../components/DashNav';
import { PanelEditor } from '../components/PanelEditor/PanelEditor';
import { SubMenu } from '../components/SubMenu/SubMenu';
// Components
import { DashboardGrid } from '../dashgrid/DashboardGrid';
import { DashboardModel, PanelModel } from '../state';
import { cleanUpDashboardAndVariables } from '../state/actions';

type OwnProps = {};

type StateProps = {
  dashboard: DashboardModel | null;
  isPanelEditorOpen?: boolean;
  editview?: UrlQueryValue;
  urlPath: string;
  urlPanelId?: UrlQueryValue;
  urlFolderId?: UrlQueryValue;
  urlViewPanelId?: UrlQueryValue;
  urlEditPanelId: UrlQueryValue;
};

type DispatchProps = {
  notifyApp: typeof notifyApp;
  cleanUpDashboardAndVariables: () => void;
};

type AllProps = OwnProps & StateProps & DispatchProps;

type OwnState = {
  editPanel: PanelModel | null;
  viewPanel: PanelModel | null;
  scrollTop: number;
  updateScrollTop?: number;
  rememberScrollTop: number;
  showLoadingState: boolean;
  path: string;
};

const logFlags: LogFlags = {
  logType: 'object',
  names: ['nextProps', 'nextState', 'prevProps', 'prevState', 'props']
};

export class DashboardPage extends Component<AllProps, OwnState> {
  locationUpdateService: LocationUpdateService = getLocationSrv();

  constructor(props: AllProps) {
    super(props, logFlags);
    this.state = {
      editPanel: null,
      viewPanel: null,
      showLoadingState: false,
      scrollTop: 0,
      rememberScrollTop: 0,
      path: props.urlPath
    };
  }

  componentWillUnmount() {
    this.setPanelFullscreenClass(false);
    if (this.state.path !== this.props.urlPath && this.state.path !== '/') {
      //this.props.cleanUpDashboardAndVariables();
    }
  }

  componentDidUpdate(prevProps: AllProps) {
    const { dashboard, urlViewPanelId, urlEditPanelId } = this.props;
    const { editPanel, viewPanel } = this.state;

    if (!dashboard) {
      return;
    }

    // if we just got dashboard update title
    if (!prevProps.dashboard) {
      document.title = dashboard.title + ' - ' + Branding.AppTitle;
    }

    // entering edit mode
    if (!editPanel && urlEditPanelId) {
      this.getPanelByIdFromUrlParam(urlEditPanelId as string, (panel) => {
        // if no edit permission show error
        if (!dashboard.canEditPanel(panel)) {
          this.props.notifyApp(createErrorNotification('Permission to edit panel denied'));
          return;
        }

        this.setState({ editPanel: panel });
      });
    }

    // leaving edit mode
    if (editPanel && !urlEditPanelId) {
      this.setState({ editPanel: null });
    }

    // entering view mode
    if (!viewPanel && urlViewPanelId) {
      this.getPanelByIdFromUrlParam(urlViewPanelId as string, (panel) => {
        this.setPanelFullscreenClass(true);
        dashboard.initViewPanel(panel);
        this.setState({
          viewPanel: panel,
          rememberScrollTop: this.state.scrollTop
        });
      });
    }

    // leaving view mode
    if (viewPanel && !urlViewPanelId) {
      this.setPanelFullscreenClass(false);
      dashboard.exitViewPanel(viewPanel);
      this.setState(
        { viewPanel: null, updateScrollTop: this.state.rememberScrollTop },
        this.triggerPanelsRendering.bind(this)
      );
    }
  }

  getPanelByIdFromUrlParam(urlPanelId: string, callback: (panel: PanelModel) => void) {
    const { dashboard } = this.props;

    const panelId = parseInt(urlPanelId!, 10);
    dashboard!.expandParentRowFor(panelId);
    const panel = dashboard!.getPanelById(panelId);

    if (!panel) {
      // Panel not found
      this.props.notifyApp(createErrorNotification(`Panel with id ${urlPanelId} not found`));
      // Clear url state
      this.locationUpdateService.update({
        query: {
          editPanel: null,
          viewPanel: null
        },
        partial: true
      });
      return;
    }

    callback(panel);
  }

  triggerPanelsRendering() {
    try {
      this.props.dashboard!.render();
    } catch (err) {
      console.error(err);
      this.props.notifyApp(createErrorNotification(`Panel rendering error`, err));
    }
  }

  setPanelFullscreenClass(isFullscreen: boolean) {
    $('body').toggleClass('panel-in-fullscreen', isFullscreen);
  }

  setScrollTop = (e: MouseEvent<HTMLElement>): void => {
    const target = e.target as HTMLElement;
    this.setState({ scrollTop: target.scrollTop, updateScrollTop: undefined });
  };

  onAddPanel = () => {
    const { dashboard } = this.props;

    if (!dashboard) {
      return;
    }

    // Return if the "Add panel" exists already
    if (dashboard.panels.length > 0 && dashboard.panels[0].type === 'add-panel') {
      return;
    }

    dashboard.addPanel({
      type: 'add-panel',
      gridPos: { x: 0, y: 0, w: 12, h: 8 },
      title: 'Panel Title'
    });

    // scroll to top after adding panel
    this.setState({ updateScrollTop: 0 });
  };

  render() {
    const { dashboard, isPanelEditorOpen, editview } = this.props;

    const { editPanel, viewPanel, scrollTop, updateScrollTop } = this.state;

    if (!dashboard) {
      return null;
    }

    // Only trigger render when the scroll has moved by 25
    const approximateScrollTop = Math.round(scrollTop / 25) * 25;

    return (
      <div className="dashboard-container">
        <PrivateComponent hasAnyAuthority={[]}>
          <DashNav dashboard={dashboard} isFullscreen={!!viewPanel} onAddPanel={this.onAddPanel} />
        </PrivateComponent>

        <div className="dashboard-scroll">
          <CustomScrollbar
            autoHeightMin="100% - 60px"
            setScrollTop={this.setScrollTop}
            scrollTop={updateScrollTop}
            updateAfterMountMs={500}
            className="custom-scrollbar--page"
          >
            <div className="dashboard-content">
              {!editPanel && <SubMenu dashboard={dashboard} />}

              <DashboardGrid
                dashboard={dashboard}
                viewPanel={viewPanel}
                editPanel={editPanel}
                scrollTop={approximateScrollTop}
                isPanelEditorOpen={isPanelEditorOpen}
                locationService={this.locationUpdateService}
              />
            </div>
          </CustomScrollbar>
        </div>

        {editPanel && (
          <PanelEditor dashboard={dashboard} sourcePanel={editPanel} locationService={this.locationUpdateService} />
        )}
        {editview && <DashboardSettings dashboard={dashboard} locationService={this.locationUpdateService} />}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState): StateProps => ({
  dashboard: state.dashboard.getModel() as DashboardModel,
  isPanelEditorOpen: state.panelEditor.isOpen,
  urlPath: state.location.path,
  urlPanelId: state.location.query.panel,
  urlFolderId: state.location.query.folder,
  urlViewPanelId: state.location.query.viewPanel,
  urlEditPanelId: state.location.query.editPanel
});

const mapDispatchToProps: DispatchProps = {
  notifyApp,
  cleanUpDashboardAndVariables
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
