export interface AuthenticationState {
  loading: boolean;
  isAuthenticated: boolean;
  loginError: boolean; // Errors returned from server side
  account: any;
  errorMessage?: string; // Errors returned from server side
  sessionHasBeenFetched: boolean;
  logoutUrl?: string;
}

export interface AuthenticationUpdate {
  errorMessage?: string;
  accessToken?: string;
}

export interface OAuthClientConfig {
  name: string;
  displayName: string;
  issuerUri: string;
  clientId: string;
  scope: string;
  authorizationUrl: string;
  redirectUrl: string;
  tokenUrl: string;
  userInfoUrl: string;
}
