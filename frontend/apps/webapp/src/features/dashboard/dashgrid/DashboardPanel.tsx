// Libraries
import { PanelPlugin } from '@savantly/sprout-api';
import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { LocationUpdateService } from '../../../core/services/locationSvc';
import { StoreState } from '../../../types';
// Types
import { DashboardModel, PanelModel } from '../state';
// Actions
import { initDashboardPanel } from '../state/actions';
// Components
import { PanelChrome } from './PanelChrome';

export interface DashboardPanelProps {
  panel: PanelModel;
  dashboard: DashboardModel;
  isEditing: boolean;
  isViewing: boolean;
  isInView: boolean;
  locationService: LocationUpdateService;
}

export const DashboardPanel: FC<DashboardPanelProps> = (props: DashboardPanelProps) => {
  const panelState = useSelector((state: StoreState) => state.dashboard.panels[props.panel.id]) || { plugin: null };
  const dispatch = useDispatch();

  useMemo(() => {
    if (!panelState.plugin) {
      dispatch(initDashboardPanel(props.panel));
    }
  }, [panelState,props,dispatch]);

  const onMouseEnter = () => {
    props.dashboard.setPanelFocus(props.panel.id);
  };

  const onMouseLeave = () => {
    props.dashboard.setPanelFocus(0);
  };

  const renderPanel = (plugin: PanelPlugin) => {
    const { dashboard, panel, isViewing, isInView, isEditing } = props;

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
              updateLocation={props.locationService}
            />
          );
        }}
      </AutoSizer>
    );
  };

  const { isViewing } = props;

  const panelWrapperClass = classNames({
    'panel-wrapper': true,
    'panel-wrapper--view': isViewing
  });

  if (panelState.plugin) {
    return (
      <div className={panelWrapperClass} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {renderPanel(panelState.plugin)}
      </div>
    );
  } else {
    return null;
  }
};
