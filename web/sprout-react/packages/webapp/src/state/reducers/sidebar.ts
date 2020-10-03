import axios from 'axios';
import { SERVER_API_URL } from "../../config/constants";

export const ACTION_TYPES = {
  ADD_ITEM: 'sidebar/ADD_ITEM',
  LOAD_MENUS: 'sidebar/LOAD_MENUS',
};

export interface ISidebarItem {
  linkTo:string, 
  title:string, 
  cssClassName:string
}

const initialState: Array<ISidebarItem> = [];

export type SidebarItemsState = Readonly<typeof initialState>;

export default (state: SidebarItemsState = initialState, action:any): SidebarItemsState => {
  switch (action.type) {
    case ACTION_TYPES.ADD_ITEM: {
      const data = action.payload;
      return [
        ...state,
        data
      ];
    }
    case ACTION_TYPES.LOAD_MENUS: {
      const data = action.payload;
      return [
        ...state,
        data
      ];
    }
    default:
      return state;
  }
};

export const addSidebarItem = (item:ISidebarItem) => (dispatch:Function, getState:Function) => {
  dispatch({
    type: ACTION_TYPES.ADD_ITEM,
    payload: item
  });
};

export const loadRootMenuItems = () => ({
  type: ACTION_TYPES.LOAD_MENUS,
  payload: axios.get(`${SERVER_API_URL}/api/menu`),
});
