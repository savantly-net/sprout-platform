import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppNotification } from '@savantly/sprout-api';

export interface AppNotificationsState {
  appNotifications: AppNotification[];
}

export const initialState: AppNotificationsState = {
  appNotifications: [] as AppNotification[]
};

const appNotificationsSlice = createSlice({
  name: 'appNotifications',
  initialState,
  reducers: {
    notifyApp: (state, action: PayloadAction<AppNotification>): AppNotificationsState => {
      const appNotifications = state.appNotifications;
      return {
        ...state,
        appNotifications: [...appNotifications, action.payload]
      };
    },
    clearAppNotification: (state, action: PayloadAction<string>): AppNotificationsState => {
      const appNotifications = state.appNotifications.filter(
        (appNotification) => appNotification.id !== action.payload
      );
      return {
        ...state,
        appNotifications: [...appNotifications]
      };
    }
  }
});

export const { notifyApp, clearAppNotification } = appNotificationsSlice.actions;

export const appNotificationsReducer = appNotificationsSlice.reducer;
