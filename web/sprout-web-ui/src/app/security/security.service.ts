import { IUser } from './user/user.component';
import { Injectable } from '@angular/core';

export interface ISecurityService {
  user: IUser;
  logout: () => void;
  login: (username: string, password: string) => boolean;
}

@Injectable()
export class SecurityService implements ISecurityService {

  user: IUser;
  login: (username: string, password: string) => boolean;
  logout() {}

  constructor() {
    this.user = {
      principal: 'demoUser',
      displayName: 'Demo User',
      authenticated: true,
      roles: ['ADMIN', 'USER']
    };
  }

}
