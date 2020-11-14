export interface AuthenticationState {
  loading: boolean;
  isAuthenticated: boolean;
  loginError: boolean; // Errors returned from server side
  errorMessage?: string; // Errors returned from server side
  sessionHasBeenFetched: boolean;
  logoutUrl?: string;
  user: User;
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

export interface User {
  firstName?: string;
  lastName?: string;
  nickname?: string;
  authorities: string[];
}