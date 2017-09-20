import { AuthenticationService } from '../authentication/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable()
export class AuthGaurdService implements CanActivate {

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  constructor(private auth: AuthenticationService, public router: Router) { }

}
