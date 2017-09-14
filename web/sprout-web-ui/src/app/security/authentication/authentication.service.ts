import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  user: any;
  security: any;

  logout() {}
  goToLogin() {}

  constructor() {
    this.user = {
        principal: 'demoUser',
        roles: ['ADMIN', 'USER']
      };
    this.security = {
        authenticated: true
      };
  }

}
