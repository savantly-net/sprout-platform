import { ComponentClass } from 'react';

export const ACTION_TYPES = {
  ADD_ITEM: 'routes/ADD_ITEM',
};

export interface IRoute {
  path: string,
  component: ComponentClass
}

const initialState: Array<IRoute> = [];

export type RouteItemsState = Readonly<typeof initialState>;

export default (state: RouteItemsState = initialState, action:any): RouteItemsState => {
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

export const addRoute = (route:IRoute) => (dispatch:Function, getState:Function) => {
  dispatch({
    type: ACTION_TYPES.ADD_ITEM,
    payload: route
  });
};