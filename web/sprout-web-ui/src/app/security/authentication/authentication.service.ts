import { Injectable } from '@angular/core';

export interface IAuthenticationService {
  isAuthenticated: () => boolean;
}

@Injectable()
export class AuthenticationService implements IAuthenticationService {

  isAuthenticated: () => boolean;

  constructor() {

  }

}
