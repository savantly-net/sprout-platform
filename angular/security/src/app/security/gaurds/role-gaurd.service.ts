import { AuthenticationService } from '../authentication/authentication.service';
import { IUser } from '../user/user.component';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import * as decode from 'jwt-decode';

@Injectable()
export class RoleGaurdService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const roles: String[] = route.data.roles;
    const token = localStorage.getItem('token') || '';
    // decode the token to get its payload
    const tokenPayload: any = decode(token);
    const userRoles: string[] = tokenPayload.user.roles;
    if (!this.auth.isAuthenticated() || roles.some(r => userRoles.some(ur => ur === r))) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  constructor(private auth: AuthenticationService, private router: Router) { }

}
