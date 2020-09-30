import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ACCESS_TOKEN_STORAGE_KEY, SERVER_API_URL } from '../../config/constants';
import { AuthenticationState, AuthenticationUpdate } from '../../types';
import store from '../store';

const initialState: AuthenticationState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  account: {} as any,
  errorMessage: undefined, // Errors returned from server side
  sessionHasBeenFetched: false,
  accessToken: undefined,
  logoutUrl: undefined,
};


export const getSession = createAsyncThunk(
  'authentication/getSession',
  async (arg, thunkAPI) => {
    const response = await axios.get(`${SERVER_API_URL}/api/account`);
    return response.data
  }
)

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthenticationUpdate>): AuthenticationState => {
      state.isAuthenticated = action.payload.accessToken ? false : true;
      if (state.isAuthenticated) {
        store.set(ACCESS_TOKEN_STORAGE_KEY, action.payload.accessToken as string);
      }
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        loginError: !state.isAuthenticated,
      };
    },
    logout: (): AuthenticationState => {
      if (store.get(ACCESS_TOKEN_STORAGE_KEY)) {
        store.delete(ACCESS_TOKEN_STORAGE_KEY);
      }
      return {
        accessToken: undefined,
        account: {},
        errorMessage: undefined,
        isAuthenticated: false,
        loading: false,
        loginError: false,
        loginSuccess: false,
        logoutUrl: undefined,
        sessionHasBeenFetched: false
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getSession.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.data && action.payload.data['name'] !== 'ANONYMOUS';
      state.account = action.payload.data;
    });
  }
})

export const { login, logout } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
