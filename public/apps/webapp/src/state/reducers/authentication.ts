import axios from 'axios';
import { ACCESS_TOKEN_STORAGE_KEY, SERVER_API_URL } from '../../config/constants';
import { Storage } from '../storage';
import { FAILURE, REQUEST, SUCCESS } from './action-type.util';

export const ACTION_TYPES = {
  AUTH_STATE_UPDATE: 'authentication/AUTH_STATE_UPDATE',
  LOGIN: 'authentication/LOGIN',
  GET_SESSION: 'authentication/GET_SESSION',
  LOGOUT: 'authentication/LOGOUT',
  CLEAR_AUTH: 'authentication/CLEAR_AUTH',
  ERROR_MESSAGE: 'authentication/ERROR_MESSAGE',
};

const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  showModalLogin: false,
  account: {} as any,
  errorMessage: (null as unknown) as string, // Errors returned from server side
  sessionHasBeenFetched: false,
  accessToken: (null as unknown) as string,
  logoutUrl: (null as unknown) as string,
};

export type AuthenticationState = Readonly<typeof initialState>;

// Reducer

export default (state: AuthenticationState = initialState, action: any): AuthenticationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.LOGIN):
    case REQUEST(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.LOGIN):
      return {
        ...initialState,
        errorMessage: action.payload,
        showModalLogin: true,
        loginError: true,
      };
    case FAILURE(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        showModalLogin: true,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: false,
        loginError: false,
        showModalLogin: false,
        loginSuccess: true,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
        showModalLogin: true,
      };
    case SUCCESS(ACTION_TYPES.GET_SESSION): {
      const isAuthenticated = action.payload && action.payload['name'] !== 'ANONYMOUS';
      return {
        ...state,
        isAuthenticated,
        loading: false,
        sessionHasBeenFetched: true,
        account: action.payload,
      };
    }
    case ACTION_TYPES.ERROR_MESSAGE:
      return {
        ...initialState,
        showModalLogin: true,
      };
    case ACTION_TYPES.CLEAR_AUTH:
      return {
        ...state,
        loading: false,
        showModalLogin: true,
        isAuthenticated: false,
      };
    case ACTION_TYPES.AUTH_STATE_UPDATE:
      if (action.payload.isAuthenticated) {
        Storage.local.set(ACCESS_TOKEN_STORAGE_KEY, action.payload.accessToken);
      }

      return {
        ...state,
        loading: action.payload.isPending,
        showModalLogin: !action.payload.isPending,
        isAuthenticated: action.payload.isAuthenticated,
      };
    default:
      return state;
  }
};

export const displayAuthError = (message: string) => ({ type: ACTION_TYPES.ERROR_MESSAGE, message });

export const getSession: () => void = () => async (dispatch: Function, getState: Function) => {
  await dispatch({
    type: ACTION_TYPES.GET_SESSION,
    payload: axios.get(`${SERVER_API_URL}/api/account`),
  });

  //const { account } = getState().authentication;
};

export const clearAuthToken = () => {
  if (Storage.local.get(ACCESS_TOKEN_STORAGE_KEY)) {
    Storage.local.remove(ACCESS_TOKEN_STORAGE_KEY);
  }
  if (Storage.session.get(ACCESS_TOKEN_STORAGE_KEY)) {
    Storage.session.remove(ACCESS_TOKEN_STORAGE_KEY);
  }
};

export const logout: () => void = () => (dispatch: Function) => {
  clearAuthToken();
  dispatch({
    type: ACTION_TYPES.LOGOUT,
  });
};

export const clearAuthentication = (messageKey: string) => (dispatch: Function, getState: Function) => {
  clearAuthToken();
  dispatch(displayAuthError(messageKey));
  dispatch({
    type: ACTION_TYPES.CLEAR_AUTH,
  });
};

export const updateAuthentication = (authState: any) => (dispatch: Function) => {
  dispatch({
    type: ACTION_TYPES.AUTH_STATE_UPDATE,
    payload: authState,
  });
};
