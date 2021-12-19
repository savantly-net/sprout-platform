import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavModelItem, NavModelItemRenderMode } from '@savantly/sprout-api';
import { WritableDraft } from '../../../../../../common/temp/node_modules/.pnpm/registry.npmjs.org/immer/7.0.14/node_modules/immer/dist/internal';
import { SERVER_API_URL } from '../../config/constants';
import { sproutApiSvc } from '../../core/services/sproutApiSvc';
import { defaultNavTree } from './defaultNavTree';

interface ServerMenuItem {
  name: string;
  displayText: string;
  icon: string | any;
  url: string;
  children: ServerMenuItem[];
  position: number;
  renderMode: NavModelItemRenderMode;
}

function navModelItemFromWritableDraft(draft: WritableDraft<NavModelItem>): NavModelItem {
  return {
    text: draft.text,
    active: draft.active,
    authority: draft.authority,
    breadcrumbs: draft.breadcrumbs,
    children: draft.children?.map(dc => navModelItemFromWritableDraft(dc)),
    divider: draft.divider,
    hideFromMenu: draft.hideFromMenu,
    hideFromTabs: draft.hideFromTabs,
    icon: draft.icon as any,
    id: draft.id,
    img: draft.img,
    onClick: draft.onClick,
    position: draft.position,
    renderMode: draft.renderMode,
    subTitle: draft.subTitle,
    target: draft.target,
    url: draft.url
  }
}

export type NavTreeState = {
  items: NavModelItem[];
  fetching: boolean;
  fetched: boolean;
  error: string;
};

const initialState: NavTreeState = {
  items: defaultNavTree,
  error: '',
  fetched: false,
  fetching: false
};

export const loadNavTreeState = createAsyncThunk('navTree/load', async (arg, thunkAPI) => {
  return sproutApiSvc.get<ServerMenuItem[]>(`${SERVER_API_URL}/api/public/menu`);
});

const navTreeSlice = createSlice({
  name: 'navTree',
  initialState,
  reducers: {
    addRootNav: (state: WritableDraft<NavTreeState>, action: PayloadAction<NavModelItem>): NavTreeState => ({
      ...state,
      items: state.items.map(d => navModelItemFromWritableDraft(d)).concat(action.payload)
    }),
    addRootNavs: (state, action: PayloadAction<NavModelItem[]>): NavTreeState => ({
      ...state,
      items: state.items.map(d => navModelItemFromWritableDraft(d)).concat(action.payload)
    }),
    updateNavTree: (state, action: PayloadAction<NavModelItem[]>): NavTreeState => ({
      ...state,
      items: action.payload
    })
  },
  extraReducers: (builder) => {
    builder.addCase(loadNavTreeState.pending, (state, action): NavTreeState => {
      return {
        items: state.items.map(d => navModelItemFromWritableDraft(d)),
        fetched: false,
        fetching: true,
        error: ''
      };
    });
    builder.addCase(loadNavTreeState.fulfilled, (state, action): NavTreeState => {
      return {
        items: state.items.map(d => navModelItemFromWritableDraft(d)),
        fetched: true,
        fetching: false,
        error: ''
      };
    });
    builder.addCase(loadNavTreeState.rejected, (state, action): NavTreeState => {
      return {
        items: state.items.map(d => navModelItemFromWritableDraft(d)),
        fetched: false,
        fetching: false,
        error: action.error.message || 'failed for unknown reason'
      };
    });
  }
});

export const { addRootNav, addRootNavs, updateNavTree } = navTreeSlice.actions;

export const navTreeReducer = navTreeSlice.reducer;
