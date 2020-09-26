import { eventFactory } from './utils';

/** Payloads */
export interface PanelChangeViewPayload {
  fullscreen?: boolean;
  edit?: boolean;
  panelId?: number;
  toggle?: boolean;
}

/** Events */
export const refresh = eventFactory('refresh');
export const componentDidMount = eventFactory('component-did-mount');
export const editModeInitialized = eventFactory('init-edit-mode');
export const panelChangeView = eventFactory<PanelChangeViewPayload>('panel-change-view');
export const panelInitialized = eventFactory('panel-initialized');
export const panelSizeChanged = eventFactory('panel-size-changed');
export const panelTeardown = eventFactory('panel-teardown');
export const render = eventFactory<any>('render');
export const viewModeChanged = eventFactory('view-mode-changed');
