import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@savantly/sprout-api';
import axios, { AxiosRequestConfig } from 'axios';
import { ACCESS_TOKEN_STORAGE_KEY, SERVER_API_URL } from '../../config/constants';
import { AuthenticationState, AuthenticationUpdate } from '../../types';
import store from '../store';

export const initialAuthenticationState: AuthenticationState = {
  loading: false,
  isAuthenticated: store.get(ACCESS_TOKEN_STORAGE_KEY) ? true : false,
  loginError: false, // Errors returned from server side
  user: {
    authorities: []
  } as User,
  errorMessage: undefined, // Errors returned from server side
  sessionHasBeenFetched: false,
  sessionFetchFailed: false,
  logoutUrl: undefined,
  showLogin: false
};

export const getSession = createAsyncThunk('authentication/getSession', async (arg, thunkAPI) => {
  const token = store.get(ACCESS_TOKEN_STORAGE_KEY);
  const config: AxiosRequestConfig = {
    headers: {}
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log('sending unauthenticated request', config);
  }
  const response = await axios.get(`${SERVER_API_URL}/api/account`, config);
  console.log(response);
  if (response.data) {
    return response.data;
  } else {
    store.delete(ACCESS_TOKEN_STORAGE_KEY);
    return thunkAPI.rejectWithValue(response);
  }
});

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthenticationState,
  reducers: {
    showLogin: (state): AuthenticationState => {
      return {
        ...state,
        showLogin: true
      };
    },
    login: (state, action: PayloadAction<AuthenticationUpdate>): AuthenticationState => {
      const isAuthenticated = action.payload.accessToken ? true : false;
      if (isAuthenticated) {
        store.set(ACCESS_TOKEN_STORAGE_KEY, action.payload.accessToken as string);
      }
      return {
        ...state,
        isAuthenticated,
        errorMessage: action.payload.errorMessage,
        loginError: !isAuthenticated,
        showLogin: !isAuthenticated,
        sessionHasBeenFetched: false,
        sessionFetchFailed: false
      };
    },
    logout: (state): AuthenticationState => {
      if (store.get(ACCESS_TOKEN_STORAGE_KEY)) {
        store.delete(ACCESS_TOKEN_STORAGE_KEY);
      }
      return {
        ...state,
        user: {
          authorities: []
        },
        errorMessage: undefined,
        isAuthenticated: false,
        loading: false,
        loginError: false,
        logoutUrl: undefined,
        showLogin: false
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      getSession.fulfilled,
      (state, action): AuthenticationState => {
        console.log(action);
        return {
          ...state,
          user: {
            ...state.user,
            ...action.payload
          },
          isAuthenticated: true,
          sessionHasBeenFetched: true,
          sessionFetchFailed: false,
          showLogin: false
        };
      }
    );
    builder.addCase(
      getSession.rejected,
      (state, action): AuthenticationState => {
        console.error(action);
        const authError = !!action.error.message && action.error.message.indexOf('401') > -1;
        return {
          ...state,
          user: {
            ...state.user
          },
          isAuthenticated: false,
          sessionHasBeenFetched: false,
          sessionFetchFailed: true,
          showLogin: authError
        };
      }
    );
  }
});

export const { login, logout, showLogin } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
