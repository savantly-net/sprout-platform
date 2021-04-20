export interface UserContext {
  loading: boolean;
  isAuthenticated: boolean;
  sessionHasBeenFetched: boolean;
  user?: User;
}

export interface User {
  name?: string;
  authorities: string[];
}
