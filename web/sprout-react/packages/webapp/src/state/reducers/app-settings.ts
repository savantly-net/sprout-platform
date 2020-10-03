import axios from 'axios';
import { SERVER_API_URL } from '../../config/constants';

import { SUCCESS } from './action-type.util';

export const ACTION_TYPES = {
  GET_SETTINGS: 'appSettings/GET_SETTINGS',
};

export interface AppSetting {
    name: string;
    value: string;
}

const emptyItems: Array<AppSetting> = [];

const initialState = {
  items: emptyItems,
  getValueByName: function(name: string) {
    const found = this.items.filter(it => {
      return it.name === name;
    });
    if (found.length > 0) {
      return found[0].value;
    } else {
      return name;
    }
  }
};

export type AppSettingsState = Readonly<typeof initialState>;

export default (state: AppSettingsState = initialState, action:any): AppSettingsState => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPES.GET_SETTINGS): {
      const { data } = action.payload;
      return {
        ...state,
        items: [...data]
      };
    }
    default:
      return state;
  }
};

export const getSettings = () => ({
  type: ACTION_TYPES.GET_SETTINGS,
  payload: axios.get(`${SERVER_API_URL}/api/ui-properties`),
});

