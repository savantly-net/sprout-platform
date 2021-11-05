import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavModelItem, NavModelItemRenderMode } from '@savantly/sprout-api';
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

function toNavModel(menuItem: ServerMenuItem): NavModelItem {
  return {
    id: menuItem.name,
    text: menuItem.displayText,
    icon: menuItem.icon || 'cube',
    url: menuItem.url,
    children: menuItem.children.map((m) => {
      return toNavModel(m);
    }),
    position: menuItem.position,
    renderMode: menuItem.renderMode
  };
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
    addRootNav: (state, action: PayloadAction<NavModelItem>): NavTreeState => ({
      ...state,
      items: state.items.concat([action.payload])
    }),
    addRootNavs: (state, action: PayloadAction<NavModelItem[]>): NavTreeState => ({
      ...state,
      items: state.items.concat(action.payload)
    }),
    updateNavTree: (state, action: PayloadAction<NavModelItem[]>): NavTreeState => ({
      ...state,
      items: action.payload
    })
  },
  extraReducers: (builder) => {
    builder.addCase(loadNavTreeState.pending, (state, action) => {
      return {
        ...state,
        fetched: false,
        fetching: true,
        error: ''
      };
    });
    builder.addCase(loadNavTreeState.fulfilled, (state, action) => {
      return {
        items: state.items.concat(action.payload.data.map((n) => toNavModel(n))),
        fetched: true,
        fetching: false,
        error: ''
      };
    });
    builder.addCase(loadNavTreeState.rejected, (state, action) => {
      return {
        ...state,
        fetched: false,
        fetching: false,
        error: action.error.message || 'failed for unknown reason'
      };
    });
  }
});

export const { addRootNav, addRootNavs, updateNavTree } = navTreeSlice.actions;

export const navTreeReducer = navTreeSlice.reducer;
