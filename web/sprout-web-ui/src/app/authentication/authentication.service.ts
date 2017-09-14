import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  authentication: any;

  constructor() {
    this.authentication = {
      user: {
        principal: 'demoUser',
        roles: ['ADMIN', 'USER']
      }
    };
  }

}
