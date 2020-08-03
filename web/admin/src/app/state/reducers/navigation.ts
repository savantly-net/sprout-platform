export const ACTION_TYPES = {
  ADD_ITEM: 'navigation/ADD_ITEM',
};

export interface INavigationItem {
  title: string,
  cssClassName: string,
  linkTo: string
}

const initialState: Array<INavigationItem> = [];

export type NavigationItemsState = Readonly<typeof initialState>;

export default (state: NavigationItemsState = initialState, action:any): NavigationItemsState => {
  switch (action.type) {
    case ACTION_TYPES.ADD_ITEM: {
      const { data } = action.payload;
      return [
        ...state,
        data
      ];
    }
    default:
      return state;
  }
};

export const addNavigationItem = (item:INavigationItem) => (dispatch:Function, getState:Function) => {
  dispatch({
    type: ACTION_TYPES.ADD_ITEM,
    payload: item
  });
};