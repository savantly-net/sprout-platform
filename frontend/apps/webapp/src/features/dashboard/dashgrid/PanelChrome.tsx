// Libraries
import { selectors } from '@grafana/e2e-selectors';
import { LoadingState, PanelData, PanelEvents, PanelPlugin, PanelPluginMeta } from '@savantly/sprout-api';
import { ErrorBoundary } from '@savantly/sprout-ui';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { PrivateComponent } from '../../../core/components/PrivateComponent/PrivateComponent';
import { LocationUpdateService } from '../../../core/services/locationSvc';
// Types
import { DashboardModel, PanelModel } from '../state';
// Components
import { PanelHeader } from './PanelHeader/PanelHeader';
import { PanelRenderer } from './PanelRenderer';

const DEFAULT_PLUGIN_ERROR = 'Error in plugin';

export interface Props {
  panel: PanelModel;
  dashboard: DashboardModel;
  plugin: PanelPlugin;
  isViewing: boolean;
  isEditing: boolean;
  isInView: boolean;
  width: number;
  height: number;
  updateLocation: LocationUpdateService;
}

export interface State {
  isFirstLoad: boolean;
  renderCounter: number;
  errorMessage?: string;
  refreshWhenInView: boolean;
  data: PanelData;
}

export class PanelChrome extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isFirstLoad: true,
      renderCounter: 0,
      refreshWhenInView: false,
      data: {
        state: LoadingState.NotStarted
      }
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { errorMessage: error.toString() };
  }

  componentDidMount() {
    const { panel, dashboard } = this.props;

    panel.events.on(PanelEvents.refresh, this.onRefresh);
    panel.events.on(PanelEvents.render, this.onRender);

    dashboard.panelInitialized(this.props.panel);
  }

  componentWillUnmount() {
    this.props.panel.events.off(PanelEvents.refresh, this.onRefresh);
    this.props.panel.events.off(PanelEvents.render, this.onRender);
  }

  componentDidUpdate(prevProps: Props) {
    const { isInView } = this.props;

    // View state has changed
    if (isInView !== prevProps.isInView) {
      if (isInView) {
        // Check if we need a delayed refresh
        if (this.state.refreshWhenInView) {
          this.onRefresh();
        }
      }
    }
  }

  // Updates the response with information from the stream
  // The next is outside a react synthetic event so setState is not batched
  // So in this context we can only do a single call to setState
  onDataUpdate(data: PanelData) {
    if (!this.props.isInView) {
      // Ignore events when not visible.
      // The call will be repeated when the panel comes into view
      return;
    }

    let { isFirstLoad } = this.state;
    let errorMessage: string | undefined;

    switch (data.state) {
      case LoadingState.Loading:
        // Skip updating state data if it is already in loading state
        // This is to avoid rendering partial loading responses
        if (this.state.data.state === LoadingState.Loading) {
          return;
        }
        break;
      case LoadingState.Error:
        const { error } = data;
        if (error) {
          if (errorMessage !== error.message) {
            errorMessage = error.message;
          }
        }
        break;
      case LoadingState.Done:
        if (isFirstLoad) {
          isFirstLoad = false;
        }
        break;
    }

    this.setState({ isFirstLoad, errorMessage, data });
  }

  onRefresh = () => {
    const { panel, isInView, width } = this.props;
    if (!isInView) {
      this.setState({ refreshWhenInView: true });
      return;
    }
    this.onRender();
  };

  onRender = () => {
    const stateUpdate = { renderCounter: this.state.renderCounter + 1 };
    this.setState(stateUpdate);
  };

  onOptionsChange = (options: any) => {
    this.props.panel.updateOptions(options);
  };

  onPanelError = (message: string) => {
    if (this.state.errorMessage !== message) {
      this.setState({ errorMessage: message });
    }
  };

  shouldSignalRenderingCompleted(loadingState: LoadingState, pluginMeta: PanelPluginMeta) {
    return loadingState === LoadingState.Done || true; // just return because we're not integrating data queries right now
  }

  hasOverlayHeader() {
    const { panel } = this.props;
    const { errorMessage } = this.state;

    // always show normal header if we have an error message
    if (errorMessage) {
      return false;
    }
    return !panel.hasTitle();
  }

  render() {
    const { dashboard, panel, isViewing, isEditing, width, height, updateLocation } = this.props;
    const { errorMessage, data } = this.state;
    const { transparent } = panel;

    const containerClassNames = classNames({
      'panel-container': true,
      'panel-container--absolute': true,
      'panel-container--transparent': transparent,
      'panel-container--no-title': this.hasOverlayHeader()
    });

    return (
      <div className={containerClassNames} aria-label={selectors.components.Panels.Panel.containerByTitle(panel.title)}>
        <PrivateComponent hasAnyAuthority={['GENERAL_ADMIN', 'DASHBOARD_EDIT']}>
          <PanelHeader
            panel={panel}
            dashboard={dashboard}
            title={panel.title}
            description={panel.description}
            error={errorMessage}
            isEditing={isEditing}
            isViewing={isViewing}
            data={data}
            updateLocationService={updateLocation}
          />
        </PrivateComponent>
        <ErrorBoundary>
          {({ error }) => {
            if (error) {
              this.onPanelError(error.message || DEFAULT_PLUGIN_ERROR);
              return null;
            } else {
              return (
                <PanelRenderer
                  panel={panel}
                  plugin={this.props.plugin}
                  data={data}
                  hasOverlayHeader={this.hasOverlayHeader()}
                  height={height}
                  width={width}
                  renderCounter={this.state.renderCounter}
                  onOptionsChange={this.onOptionsChange}
                ></PanelRenderer>
              );
            }
          }}
        </ErrorBoundary>
      </div>
    );
  }
}
