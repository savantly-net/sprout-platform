import { Injectable, Injector } from '@angular/core';
import { Resource, RestService, EmbeddedResource } from '@lagoshny/ngx-hal-client';
import { SproutRole, SproutPrivilege } from '../sprout-role/sprout-role.service';

export class SproutEmbeddedRole extends EmbeddedResource {
  id?: string;
  privileges: SproutPrivilege[]
}

export class SproutUser extends Resource {
  createdDate?: string;
  lastModifiedDate?: string;
  id?: string;
  username?: string;
  displayName?: string;
  hidePrimaryEmailAddress?: boolean;
  firstName?: string;
  lastName?: string;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  enabled?: boolean;
  phoneNumber?: string;
  password?: string; // not returned to client

  roles: SproutEmbeddedRole[];
}

@Injectable({
  providedIn: 'root'
})
export class SproutUserService extends RestService<SproutUser> {

  constructor(injector: Injector) {
    super(SproutUser, 'users', injector);
   }
}
