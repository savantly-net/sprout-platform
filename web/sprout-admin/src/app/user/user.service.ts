import { HalResponse, RestRepositoryService } from '../spring-data/rest-repository.service';
import { EmailAddress } from './email-service';
import { Role } from './role.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


export class Organization extends HalResponse {
  name: string;
}

export class OAuthAccount extends HalResponse {
  provider: string;
  token: string;
}

export class User extends HalResponse {
  password: string;
  username: string;
  displayName: string;
  emailAddresses: EmailAddress[];
  hidePrimaryEmailAddress: boolean;
  primaryEmailAddress: EmailAddress;
  firstName: string;
  lastName: string;
  authorities: string[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  organization: Organization;
  phoneNumber: string;
  oAuthAccounts: OAuthAccount[];
  clearTextPassword: string;
}

@Injectable()
export class UserService extends RestRepositoryService<User> {

  putRoles(user: User, roles: Role[]) {
    const payload = roles.map(r => r._links.self.href).join('\n');
    const headers = new HttpHeaders({'Content-Type': 'text/uri-list'});
    return this.http.put(user._links.roles.href, payload, {headers: headers});
  }

  constructor(http: HttpClient) {
    super(http, '/api/repo/users');
  }

}
