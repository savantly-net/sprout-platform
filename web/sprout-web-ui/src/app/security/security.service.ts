import { IUser } from './user/user.component';
import { Injectable } from '@angular/core';

@Injectable()
export class SecurityService {

  user: IUser;

  logout() {}
  goToLogin() {}

  constructor() {
    this.user = {
      principal: 'demoUser',
      displayName: 'Demo User',
      authenticated: true,
      roles: ['ADMIN', 'USER']
    };
  }

}
