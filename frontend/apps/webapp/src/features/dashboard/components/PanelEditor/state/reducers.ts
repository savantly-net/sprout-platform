import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PanelModel } from '../../../state/PanelModel';
import { LoadingState, PanelData } from '@savantly/sprout-api';
import { DisplayMode } from '../types';
import store from '../../../../../core/store';

export const PANEL_EDITOR_UI_STATE_STORAGE_KEY = 'grafana.dashboard.editor.ui';

export interface PanelEditorUIState {
  /* Visualization options pane visibility */
  isPanelOptionsVisible: boolean;
  /* Pixels or percentage */
  rightPaneSize: number | string;
  /* Pixels or percentage */
  topPaneSize: number | string;
  /* Visualization size mode */
  mode: DisplayMode;
}

export const DEFAULT_PANEL_EDITOR_UI_STATE: PanelEditorUIState = {
  isPanelOptionsVisible: true,
  rightPaneSize: 400,
  topPaneSize: '45%',
  mode: DisplayMode.Fill,
};

export interface PanelEditorState {
  /* These are functions as they are mutaded later on and redux toolkit will Object.freeze state so
   * we need to store these using functions instead */
  getSourcePanel: () => PanelModel;
  getPanel: () => PanelModel;
  getData: () => PanelData;
  initDone: boolean;
  shouldDiscardChanges: boolean;
  isOpen: boolean;
  ui: PanelEditorUIState;
}

export const initialPanelEditorState = (): PanelEditorState => {
  return {
    getPanel: () => new PanelModel({}),
    getSourcePanel: () => new PanelModel({}),
    getData: () => ({
      state: LoadingState.NotStarted,
    }),
    initDone: false,
    shouldDiscardChanges: false,
    isOpen: false,
    ui: {
      ...DEFAULT_PANEL_EDITOR_UI_STATE,
      ...store.getObject(PANEL_EDITOR_UI_STATE_STORAGE_KEY, DEFAULT_PANEL_EDITOR_UI_STATE),
    },
  };
};

interface InitEditorPayload {
  panel: PanelModel;
  sourcePanel: PanelModel;
}

const pluginsSlice = createSlice({
  name: 'panelEditor',
  initialState: initialPanelEditorState(),
  reducers: {
    updateEditorInitState: (state, action: PayloadAction<InitEditorPayload>) => {
      state.getPanel = () => action.payload.panel;
      state.getSourcePanel = () => action.payload.sourcePanel;
      state.initDone = true;
      state.isOpen = true;
      state.shouldDiscardChanges = false;
    },
    setEditorPanelData: (state, action: PayloadAction<PanelData>) => {
      state.getData = () => action.payload;
    },
    setDiscardChanges: (state, action: PayloadAction<boolean>) => {
      state.shouldDiscardChanges = action.payload;
    },
    setPanelEditorUIState: (state, action: PayloadAction<Partial<PanelEditorUIState>>) => {
      state.ui = { ...state.ui, ...action.payload };
    },
    closeCompleted: state => {
      state.isOpen = false;
      state.initDone = false;
    },
  },
});

export const {
  updateEditorInitState,
  setEditorPanelData,
  setDiscardChanges,
  closeCompleted,
  setPanelEditorUIState,
} = pluginsSlice.actions;

export const panelEditorReducer = pluginsSlice.reducer;
