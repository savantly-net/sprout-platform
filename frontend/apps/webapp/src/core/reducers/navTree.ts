import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavModelItem } from '@savantly/sprout-api';
import { defaultNavTree } from '../../mocks/navTree';

export type NavTreeState = {
  items: NavModelItem[];
};

// TODO: #35 get initial nav tree from server
export const initialState: NavTreeState = {
  items: defaultNavTree as NavModelItem[]
};

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
  }
});

export const { addRootNav, addRootNavs, updateNavTree } = navTreeSlice.actions;

export const navTreeReducer = navTreeSlice.reducer;
