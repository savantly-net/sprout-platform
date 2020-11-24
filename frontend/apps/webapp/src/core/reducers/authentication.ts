import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
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
    const token = store.get(ACCESS_TOKEN_STORAGE_KEY);
    const config: AxiosRequestConfig = {
      headers: {}
    };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log('sending unauthenticated request', config);
    }
    const promise = new Promise<any>((resolve, reject) => {
      axios.get(`${SERVER_API_URL}/api/account`, config)
      .then(response => {
        resolve(response.data);
      }).catch(error => {
        console.error(error);
        store.delete(ACCESS_TOKEN_STORAGE_KEY)
        reject(error);
      });
    });
    return promise;
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
      } else {
        store.set(ACCESS_TOKEN_STORAGE_KEY, false);
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
        //store.delete(ACCESS_TOKEN_STORAGE_KEY);
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
    builder.addCase(getSession.rejected, (state, action): AuthenticationState => {
      console.error(action);
      return {
        ...state,
        user: {
          ...state.user
        },
        isAuthenticated: false,
        sessionHasBeenFetched: false
      };
    });
  }
});

export const { login, logout } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
