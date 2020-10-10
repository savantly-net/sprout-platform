import React, { Component } from 'react';
import classNames from 'classnames';
import { isEqual } from 'lodash';
import { LoadingState, PanelData, PanelMenuItem } from '@savantly/sprout-api';
import { ClickOutsideWrapper, Icon, Tooltip } from '@savantly/sprout-ui';
import { selectors } from '@grafana/e2e-selectors';

import PanelHeaderCorner from './PanelHeaderCorner';
import { PanelHeaderMenu } from './PanelHeaderMenu';

import { DashboardModel } from '../../state/DashboardModel';
import { PanelModel } from '../../state/PanelModel';
import { getPanelMenu } from '../../utils/getPanelMenu';
import { getLocationSrv, LocationSrv } from '@savantly/sprout-runtime';
import { LocationUpdateService } from '../../../../core/services/locationSvc';

export interface Props {
  panel: PanelModel;
  dashboard: DashboardModel;
  title?: string;
  description?: string;
  error?: string;
  alertState?: string;
  isViewing: boolean;
  isEditing: boolean;
  data: PanelData;
  updateLocationService: LocationUpdateService;
}

interface ClickCoordinates {
  x: number;
  y: number;
}

interface State {
  panelMenuOpen: boolean;
  menuItems: PanelMenuItem[];
}

export class PanelHeader extends Component<Props, State> {
  clickCoordinates: ClickCoordinates = { x: 0, y: 0 };

  state: State = {
    panelMenuOpen: false,
    menuItems: [],
  };

  eventToClickCoordinates = (event: React.MouseEvent<HTMLDivElement>) => {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  };

  onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    this.clickCoordinates = this.eventToClickCoordinates(event);
  };

  isClick = (clickCoordinates: ClickCoordinates) => {
    return isEqual(clickCoordinates, this.clickCoordinates);
  };

  onMenuToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!this.isClick(this.eventToClickCoordinates(event))) {
      return;
    }

    event.stopPropagation();

    const { dashboard, panel, updateLocationService } = this.props;
    const menuItems = getPanelMenu(updateLocationService, dashboard, panel);

    this.setState({
      panelMenuOpen: !this.state.panelMenuOpen,
      menuItems,
    });
  };

  closeMenu = () => {
    this.setState({
      panelMenuOpen: false,
    });
  };

  private renderLoadingState(): JSX.Element {
    return (
      <div className="panel-loading">
        <Tooltip content="loading">
          <Icon className="panel-loading__spinner spin-clockwise" name="sync" />
        </Tooltip>
      </div>
    );
  }

  openInspect = (e: React.SyntheticEvent, tab: string) => {
    const { updateLocationService, panel } = this.props;

    e.stopPropagation();

    updateLocationService.update({
      query: { inspect: panel.id, inspectTab: tab },
      partial: true,
    });
  };

  renderNotice = (notice: any) => {
    return (
      <Tooltip content={notice.text} key={notice.severity}>
        {notice.inspect ? (
          <div className="panel-info-notice pointer" onClick={e => this.openInspect(e, notice.inspect!)}>
            <Icon name="info-circle" style={{ marginRight: '8px' }} />
          </div>
        ) : (
          <a className="panel-info-notice" href={notice.link} target="_blank">
            <Icon name="info-circle" style={{ marginRight: '8px' }} />
          </a>
        )}
      </Tooltip>
    );
  };

  render() {
    const { panel, error, isViewing, isEditing, data, alertState } = this.props;
    const { menuItems } = this.state;
    const title = panel.title;

    const panelHeaderClass = classNames({
      'panel-header': true,
      'grid-drag-handle': !(isViewing || isEditing),
    });

    // dedupe on severity
    const notices: Record<string, any> = {};

    return (
      <>
        {data.state === LoadingState.Loading && this.renderLoadingState()}
        <div className={panelHeaderClass}>
          <PanelHeaderCorner
            panel={panel}
            title={panel.title}
            description={panel.description}
            error={error}
          />
          <div
            className="panel-title-container"
            onClick={this.onMenuToggle}
            onMouseDown={this.onMouseDown}
            aria-label={selectors.components.Panels.Panel.title(title)}
          >
            <div className="panel-title">
              {Object.values(notices).map(this.renderNotice)}
              {alertState && (
                <Icon
                  name={alertState === 'alerting' ? 'heart-break' : 'heart'}
                  className="icon-gf panel-alert-icon"
                  style={{ marginRight: '4px' }}
                  size="sm"
                />
              )}
              <span className="panel-title-text">{title}</span>
              <Icon name="angle-down" className="panel-menu-toggle" />
              {this.state.panelMenuOpen && (
                <ClickOutsideWrapper onClick={this.closeMenu} parent={document}>
                  <PanelHeaderMenu items={menuItems} />
                </ClickOutsideWrapper>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
