export const ACTION_TYPES = {
  ADD_ITEM: 'sidebar/ADD_ITEM',
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