export interface AuthenticationState {
    loading: boolean,
    isAuthenticated: boolean,
    loginSuccess: boolean,
    loginError: boolean, // Errors returned from server side
    account: any,
    errorMessage?: string, // Errors returned from server side
    sessionHasBeenFetched: boolean,
    accessToken?: string,
    logoutUrl?: string,
  }


export interface AuthenticationUpdate {
    errorMessage?: string;
    accessToken?: string
  }