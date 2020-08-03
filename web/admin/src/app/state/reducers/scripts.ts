import { SUCCESS } from './action-type.util';

export const ACTION_TYPES = {
  ADD_ITEM: 'scripts/ADD_ITEM',
};

const initialState: Array<any> = [];

export type ScriptItemsState = Readonly<typeof initialState>;

export default (state: ScriptItemsState = initialState, action:any): ScriptItemsState => {
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