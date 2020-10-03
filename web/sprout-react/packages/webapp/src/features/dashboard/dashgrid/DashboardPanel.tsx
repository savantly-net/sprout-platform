// Libraries
import { PanelPlugin } from '@savantly/sprout-api';
import classNames from 'classnames';
import React, { ComponentClass, PureComponent } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { updateLocation } from '../../../core/reducers/location';
import { StoreState } from '../../../types';
// Types
import { DashboardModel, PanelModel } from '../state';
// Actions
import { initDashboardPanel } from '../state/actions';
// Components
import { PanelChrome } from './PanelChrome';


export interface OwnProps {
  panel: PanelModel;
  dashboard: DashboardModel;
  isEditing: boolean;
  isViewing: boolean;
  isInView: boolean;
}

export interface ConnectedProps {
  plugin?: PanelPlugin | null;
}

export interface DispatchProps {
  initDashboardPanel: typeof initDashboardPanel;
  updateLocation: typeof updateLocation;
}

export type Props = OwnProps & ConnectedProps & DispatchProps;

export interface State {
  isLazy: boolean;
}

export class DashboardPanelUnconnected extends PureComponent<Props, State> {
  specialPanels: { [key: string]: Function } = {};

  constructor(props: Props) {
    super(props);

    this.state = {
      isLazy: !props.isInView,
    };
  }

  componentDidMount() {
    this.props.initDashboardPanel(this.props.panel);
  }

  componentDidUpdate() {
    if (this.state.isLazy && this.props.isInView) {
      this.setState({ isLazy: false });
    }
  }

  onMouseEnter = () => {
    this.props.dashboard.setPanelFocus(this.props.panel.id);
  };

  onMouseLeave = () => {
    this.props.dashboard.setPanelFocus(0);
  };

  renderPanel(plugin: PanelPlugin) {
    const { dashboard, panel, isViewing, isInView, isEditing, updateLocation } = this.props;

    return (
      <AutoSizer>
        {({ width, height }) => {
          if (width === 0) {
            return null;
          }
          return (
            <PanelChrome
              plugin={plugin}
              panel={panel}
              dashboard={dashboard}
              isViewing={isViewing}
              isEditing={isEditing}
              isInView={isInView}
              width={width}
              height={height}
              updateLocation={updateLocation}
            />
          );
        }}
      </AutoSizer>
    );
  }

  render() {
    const { isViewing, plugin } = this.props;
    const { isLazy } = this.state;

    // if we have not loaded plugin exports yet, wait
    if (!plugin) {
      return null;
    }

    // If we are lazy state don't render anything
    if (isLazy) {
      return null;
    }

    const panelWrapperClass = classNames({
      'panel-wrapper': true,
      'panel-wrapper--view': isViewing,
    });

    return (
      <div className={panelWrapperClass} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {this.renderPanel(plugin)}
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<ConnectedProps, OwnProps, StoreState> = (state, props) => {
  const panelState = state.dashboard.panels[props.panel.id];
  if (!panelState) {
    return { plugin: null };
  }

  return {
    plugin: panelState.plugin,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = { initDashboardPanel, updateLocation };

export const DashboardPanel = connect(mapStateToProps, mapDispatchToProps)(DashboardPanelUnconnected as ComponentClass<any>);
