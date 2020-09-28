import { DashboardState, PanelState } from '../../../types';

export function getPanelStateById(state: DashboardState, panelId: number): PanelState {
  if (!panelId) {
    return {} as PanelState;
  }

  return state.panels[panelId] ?? ({} as PanelState);
}
