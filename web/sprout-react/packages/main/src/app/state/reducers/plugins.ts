export const ACTION_TYPES = {
  ADD_ITEM: 'plugins/ADD_ITEM',
};

export interface IPlugin {
    key: string,
    name: string,
    version: string,
    installed: boolean,
    description: string
}

const initialState: Array<IPlugin> = [];

export type PluginItemsState = Readonly<typeof initialState>;

export default (state: PluginItemsState = initialState, action:any): PluginItemsState => {
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

export const addPlugin = (plugin:IPlugin) => (dispatch:Function, getState:Function) => {
  dispatch({
    type: ACTION_TYPES.ADD_ITEM,
    payload: plugin
  });
};