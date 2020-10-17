import { selectors } from '@grafana/e2e-selectors';
import { GrafanaTheme, PanelPlugin } from '@savantly/sprout-api';
import { Button, getTheme, HorizontalGroup, Icon, RadioButtonGroup, stylesFactory } from '@savantly/sprout-ui';
import { css, cx } from 'emotion';
import React, { PureComponent } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { BackButton } from '../../../../core/components/BackButton/BackButton';
import { LocationUpdateService } from '../../../../core/services/locationSvc';
import { StoreState } from '../../../../types/store';
import { DashboardPanel } from '../../dashgrid/DashboardPanel';
import { DashboardModel } from '../../state/DashboardModel';
import { PanelModel } from '../../state/PanelModel';
import { getPanelStateById } from '../../state/selectors';
import { DashNavButton } from '../DashNav/DashNavButton';
import { OptionsPaneContent } from './OptionsPaneContent';
import { PanelEditorTabs } from './PanelEditorTabs';
import { initPanelEditor, panelEditorCleanUp, updatePanelEditorUIState } from './state/actions';
import { PanelEditorUIState, setDiscardChanges } from './state/reducers';
import { getPanelEditorTabs } from './state/selectors';
import { DisplayMode, displayModes, PanelEditorTab } from './types';
import { calculatePanelSize } from './utils';

const splitPane = require('react-split-pane');
const SplitPane = splitPane.default;

interface OwnProps {
  dashboard: DashboardModel;
  sourcePanel: PanelModel;
  locationService: LocationUpdateService
}

interface ConnectedProps {
  plugin?: PanelPlugin;
  panel: PanelModel;
  initDone: boolean;
  tabs: PanelEditorTab[];
  uiState: PanelEditorUIState;
  themeName: string;
}

interface DispatchProps {
  initPanelEditor: typeof initPanelEditor;
  panelEditorCleanUp: typeof panelEditorCleanUp;
  setDiscardChanges: typeof setDiscardChanges;
  updatePanelEditorUIState: typeof updatePanelEditorUIState;
}

type Props = OwnProps & ConnectedProps & DispatchProps;

export class PanelEditorUnconnected extends PureComponent<Props> {

  componentDidMount() {
    this.props.initPanelEditor(this.props.sourcePanel, this.props.dashboard);
  }

  componentWillUnmount() {
    this.props.panelEditorCleanUp();
  }

  onPanelExit = () => {
    this.props.locationService.update({
      query: { editPanel: null, tab: null },
      partial: true,
    })
  };

  onDiscard = () => {
    this.props.setDiscardChanges(true);
    this.props.locationService.update({
      query: { editPanel: null, tab: null },
      partial: true,
    })
  };

  onOpenDashboardSettings = () => {
    this.props.locationService.update({ query: { editview: 'settings' }, partial: true });
  };

  onSaveDashboard = () => {
    // TODO:
    /*
    appEvents.emit(CoreEvents.showModalReact, {
      component: SaveDashboardModalProxy,
      props: { dashboard: this.props.dashboard },
    });
    */
  };

  onChangeTab = (tab: PanelEditorTab) => {
    this.props.locationService.update({ query: { tab: tab.id }, partial: true });
  };

  onPanelOptionsChanged = (options: any) => {
    this.props.panel.updateOptions(options);
    this.forceUpdate();
  };

  onPanelConfigChanged = (configKey: string, value: any) => {
    // @ts-ignore
    this.props.panel[configKey] = value;
    this.props.panel.render();
    this.forceUpdate();
  };

  onDragFinished = (pane: Pane, size?: number) => {
    document.body.style.cursor = 'auto';

    // When the drag handle is just clicked size is undefined
    if (!size) {
      return;
    }

    const targetPane = pane === Pane.Top ? 'topPaneSize' : 'rightPaneSize';
    const { updatePanelEditorUIState } = this.props;
    updatePanelEditorUIState({
      [targetPane]: size,
    });
  };

  onDragStarted = () => {
    document.body.style.cursor = 'row-resize';
  };

  onDiplayModeChange = (mode?: DisplayMode) => {
    const { updatePanelEditorUIState } = this.props;
    updatePanelEditorUIState({
      mode: mode,
    });
  };

  onTogglePanelOptions = () => {
    const { uiState, updatePanelEditorUIState } = this.props;
    updatePanelEditorUIState({ isPanelOptionsVisible: !uiState.isPanelOptionsVisible });
  };

  renderPanel = (styles: EditorStyles) => {
    const { dashboard, panel, tabs, uiState } = this.props;
    return (
      <div className={cx(styles.mainPaneWrapper, tabs.length === 0 && styles.mainPaneWrapperNoTabs)}>
        {this.renderPanelToolbar(styles)}
        <div className={styles.panelWrapper}>
          <AutoSizer>
            {({ width, height }) => {
              if (width < 3 || height < 3) {
                return null;
              }
              return (
                <div className={styles.centeringContainer} style={{ width, height }}>
                  <div style={calculatePanelSize(uiState.mode, width, height, panel)}>
                    <DashboardPanel
                      dashboard={dashboard}
                      panel={panel}
                      isEditing={true}
                      isViewing={false}
                      isInView={true}
                      locationService={this.props.locationService}
                    />
                  </div>
                </div>
              );
            }}
          </AutoSizer>
        </div>
      </div>
    );
  };
  renderHorizontalSplit(styles: EditorStyles) {
    const { dashboard, panel, tabs, uiState } = this.props;
    return tabs.length > 0 ? (
      <SplitPane
        split="horizontal"
        minSize={200}
        primary="first"
        /* Use persisted state for default size */
        defaultSize={uiState.topPaneSize}
        pane2Style={{ minHeight: 0 }}
        resizerClassName={styles.resizerH}
        onDragStarted={this.onDragStarted}
        onDragFinished={(size: number | undefined) => this.onDragFinished(Pane.Top, size)}
      >
        {this.renderPanel(styles)}
        <div className={styles.tabsWrapper} aria-label={selectors.components.PanelEditor.DataPane.content}>
          <PanelEditorTabs panel={panel} dashboard={dashboard} tabs={tabs} onChangeTab={this.onChangeTab} />
        </div>
      </SplitPane>
    ) : (
      this.renderPanel(styles)
    );
  }

  renderPanelToolbar(styles: EditorStyles) {
    const { dashboard, uiState } = this.props;
    return (
      <div className={styles.panelToolbar}>
        <HorizontalGroup justify={'flex-end'} align="flex-start">

          <HorizontalGroup>
            <RadioButtonGroup value={uiState.mode} options={displayModes} onChange={this.onDiplayModeChange} />
            {!uiState.isPanelOptionsVisible && (
              <DashNavButton
                onClick={this.onTogglePanelOptions}
                tooltip="Open options pane"
                classSuffix="close-options"
              >
                <Icon name="angle-left" /> <span style={{ paddingLeft: '6px' }}>Show options</span>
              </DashNavButton>
            )}
          </HorizontalGroup>
        </HorizontalGroup>
      </div>
    );
  }

  editorToolbar(styles: EditorStyles) {
    const { dashboard } = this.props;

    return (
      <div className={styles.editorToolbar}>
        <HorizontalGroup justify="space-between" align="center">
          <div className={styles.toolbarLeft}>
            <HorizontalGroup spacing="none">
              <BackButton onClick={this.onPanelExit} surface="panel" />
              <span className={styles.editorTitle}>{dashboard.title} / Edit Panel</span>
            </HorizontalGroup>
          </div>

          <HorizontalGroup>
            <HorizontalGroup spacing="sm" align="center">
              <Button
                icon="cog"
                onClick={this.onOpenDashboardSettings}
                variant="secondary"
                title="Open dashboard settings"
              />
              <Button onClick={this.onDiscard} variant="secondary" title="Undo all changes">
                Discard
              </Button>
              <Button onClick={this.onSaveDashboard} variant="secondary" title="Apply changes and save dashboard">
                Save
              </Button>
              <Button onClick={this.onPanelExit} title="Apply changes and go back to dashboard">
                Apply
              </Button>
            </HorizontalGroup>
          </HorizontalGroup>
        </HorizontalGroup>
      </div>
    );
  }

  renderOptionsPane() {
    const { plugin, dashboard, panel, uiState } = this.props;

    if (!plugin) {
      return <div />;
    }

    return (
      <OptionsPaneContent
        plugin={plugin}
        dashboard={dashboard}
        panel={panel}
        width={uiState.rightPaneSize as number}
        onClose={this.onTogglePanelOptions}
        onPanelOptionsChanged={this.onPanelOptionsChanged}
        onPanelConfigChange={this.onPanelConfigChanged}
      />
    );
  }

  renderWithOptionsPane(styles: EditorStyles) {
    const { uiState } = this.props;

    return (
      <SplitPane
        split="vertical"
        minSize={300}
        primary="second"
        /* Use persisted state for default size */
        defaultSize={uiState.rightPaneSize}
        resizerClassName={styles.resizerV}
        onDragStarted={() => (document.body.style.cursor = 'col-resize')}
        onDragFinished={(size: number | undefined) => this.onDragFinished(Pane.Right, size)}
      >
        {this.renderHorizontalSplit(styles)}
        {this.renderOptionsPane()}
      </SplitPane>
    );
  }

  render() {
    const { initDone, uiState } = this.props;
    const styles = getStyles(getTheme(this.props.themeName), this.props);

    if (!initDone) {
      return null;
    }

    return (
      <div className={styles.wrapper} aria-label={selectors.components.PanelEditor.General.content}>
        {this.editorToolbar(styles)}
        <div className={styles.verticalSplitPanesWrapper}>
          {uiState.isPanelOptionsVisible ? this.renderWithOptionsPane(styles) : this.renderHorizontalSplit(styles)}
        </div>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<ConnectedProps, OwnProps, StoreState> = (state, props) => {
  const panel = state.panelEditor.getPanel();
  const { plugin } = getPanelStateById(state.dashboard, panel.id);

  return {
    plugin: plugin,
    panel,
    initDone: state.panelEditor.initDone,
    tabs: getPanelEditorTabs(plugin),
    uiState: state.panelEditor.ui,
    themeName: state.application.themeName
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  initPanelEditor,
  panelEditorCleanUp,
  setDiscardChanges,
  updatePanelEditorUIState
};

export const PanelEditor = connect(mapStateToProps, mapDispatchToProps)(PanelEditorUnconnected as any);

enum Pane {
  Right,
  Top,
}

/*
 * Styles
 */
export const getStyles = stylesFactory((theme: GrafanaTheme, props: Props) => {
  const { uiState } = props;
  const handleColor = theme.palette.blue95;
  const paneSpacing = theme.spacing.md;

  const resizer = css`
    font-style: italic;
    background: transparent;
    border-top: 0;
    border-right: 0;
    border-bottom: 0;
    border-left: 0;
    border-color: transparent;
    border-style: solid;
    transition: 0.2s border-color ease-in-out;

    &:hover {
      border-color: ${handleColor};
    }
  `;

  return {
    wrapper: css`
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: ${theme.zIndex.sidemenu};
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${theme.colors.dashboardBg};
      display: flex;
      flex-direction: column;
    `,
    verticalSplitPanesWrapper: css`
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      position: relative;
    `,
    mainPaneWrapper: css`
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      padding-right: ${uiState.isPanelOptionsVisible ? 0 : paneSpacing};
    `,
    mainPaneWrapperNoTabs: css`
      padding-bottom: ${paneSpacing};
    `,
    variablesWrapper: css`
      label: variablesWrapper;
      display: flex;
      flex-grow: 1;
      flex-wrap: wrap;
    `,
    panelWrapper: css`
      flex: 1 1 0;
      min-height: 0;
      width: 100%;
      padding-left: ${paneSpacing};
    `,
    resizerV: cx(
      resizer,
      css`
        cursor: col-resize;
        width: ${paneSpacing};
        border-right-width: 1px;
        margin-top: 18px;
      `
    ),
    resizerH: cx(
      resizer,
      css`
        height: ${paneSpacing};
        cursor: row-resize;
        position: relative;
        top: 0px;
        z-index: 1;
        border-top-width: 1px;
        margin-left: ${paneSpacing};
      `
    ),
    tabsWrapper: css`
      height: 100%;
      width: 100%;
    `,
    editorToolbar: css`
      display: flex;
      padding: ${theme.spacing.sm};
      background: ${theme.colors.panelBg};
      justify-content: space-between;
      border-bottom: 1px solid ${theme.colors.panelBorder};
    `,
    panelToolbar: css`
      display: flex;
      padding: ${paneSpacing} 0 ${paneSpacing} ${paneSpacing};
      justify-content: space-between;
      flex-wrap: wrap;
    `,
    toolbarLeft: css`
      padding-left: ${theme.spacing.sm};
    `,
    centeringContainer: css`
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    editorTitle: css`
      font-size: ${theme.typography.size.lg};
      padding-left: ${theme.spacing.md};
    `,
  };
});

type EditorStyles = ReturnType<typeof getStyles>;
