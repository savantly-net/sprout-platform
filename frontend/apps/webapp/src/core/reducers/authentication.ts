import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ACCESS_TOKEN_STORAGE_KEY, SERVER_API_URL } from '../../config/constants';
import { AuthenticationState, AuthenticationUpdate, User } from '../../types';
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
  initialState: initialAuthenticationState,
  reducers: {
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
      };
    },
    logout: (): AuthenticationState => {
      if (store.get(ACCESS_TOKEN_STORAGE_KEY)) {
        store.delete(ACCESS_TOKEN_STORAGE_KEY);
      }
      return {
        user: {
          authorities: []
        },
        errorMessage: undefined,
        isAuthenticated: false,
        loading: false,
        loginError: false,
        logoutUrl: undefined,
        sessionHasBeenFetched: false
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getSession.fulfilled, (state, action): AuthenticationState => {
      console.log(state);
      console.log(action);
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        },
        sessionHasBeenFetched: true
      };
    });
  }
});

export const { login, logout } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
