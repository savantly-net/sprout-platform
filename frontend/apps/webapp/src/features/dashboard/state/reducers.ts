import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardInitError, DashboardInitPhase, DashboardState, PanelState } from '../../../types';
import { EDIT_PANEL_ID } from '../../../core/constants';
import { panelEditorReducer } from '../components/PanelEditor/state/reducers';
import { DashboardModel } from './DashboardModel';
import { PanelModel } from './PanelModel';
import { PanelPlugin } from '@savantly/sprout-api';

export const initialDashboardState: DashboardState = {
  initPhase: DashboardInitPhase.NotStarted,
  isInitSlow: false,
  getModel: () => null,
  panels: {},
  initError: null
};

export interface PanelModelAndPluginReadyPayload {
  panelId: number;
  plugin: PanelPlugin;
}

const dashbardSlice = createSlice({
  name: 'dashboard',
  initialState: initialDashboardState,
  reducers: {
    dashboardInitFetching: (state, action: PayloadAction) => {
      state.initPhase = DashboardInitPhase.Fetching;
    },
    dashboardInitServices: (state, action: PayloadAction) => {
      state.initPhase = DashboardInitPhase.Services;
    },
    dashboardInitSlow: (state, action: PayloadAction) => {
      state.isInitSlow = true;
    },
    dashboardInitCompleted: (state, action: PayloadAction<DashboardModel>) => {
      state.getModel = () => action.payload;
      state.initPhase = DashboardInitPhase.Completed;
      state.isInitSlow = false;
      state.initError = null;
      for (const panel of action.payload.panels) {
        state.panels[panel.id] = {
          pluginId: panel.type
        };
      }
    },
    dashboardInitFailed: (state, action: PayloadAction<DashboardInitError>) => {
      state.initPhase = DashboardInitPhase.Failed;
      state.initError = action.payload;
      state.getModel = () => {
        return new DashboardModel({ title: 'Dashboard init failed' }, { canSave: false, canEdit: false });
      };
    },
    cleanUpDashboard: (state, action: PayloadAction) => {
      if (state.getModel()) {
        state.getModel()!.destroy();
        state.getModel = () => null;
      }

      state.panels = {};
      state.initPhase = DashboardInitPhase.NotStarted;
      state.isInitSlow = false;
      state.initError = null;
    },
    panelModelAndPluginReady: (state, action: PayloadAction<PanelModelAndPluginReadyPayload>) => {
      updatePanelState(state as DashboardState, action.payload.panelId, { plugin: action.payload.plugin as any });
    },
    cleanUpEditPanel: (state, action: PayloadAction) => {
      // TODO: refactor, since the state should be mutated by copying only
      delete state.panels[EDIT_PANEL_ID];
    },
    addPanel: (state, action: PayloadAction<PanelModel>) => {
      // TODO: refactor, since the state should be mutated by copying only
      state.panels[action.payload.id] = { pluginId: action.payload.type };
    }
  }
});

export function updatePanelState(state: DashboardState, panelId: number, ps: Partial<PanelState>) {
  if (!state.panels[panelId]) {
    state.panels[panelId] = ps as PanelState;
  } else {
    Object.assign(state.panels[panelId], ps);
  }
}


export const {
  dashboardInitFetching,
  dashboardInitFailed,
  dashboardInitSlow,
  dashboardInitCompleted,
  dashboardInitServices,
  cleanUpDashboard,
  panelModelAndPluginReady,
  addPanel,
  cleanUpEditPanel
} = dashbardSlice.actions;

export const dashboardReducer = dashbardSlice.reducer;

export default {
  dashboard: dashboardReducer,
  panelEditor: panelEditorReducer
};
