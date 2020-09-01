import { Injectable, Injector } from '@angular/core';
import { Resource, RestService, EmbeddedResource } from '@lagoshny/ngx-hal-client';

export class SproutPrivilege extends EmbeddedResource {
  id?: string;
  createdDate?: string;
  lastModifiedDate?: string;
}

export class SproutRole extends Resource {
  id?: string;
  privileges: SproutPrivilege[];
}

@Injectable({
  providedIn: 'root'
})
export class SproutRoleService extends RestService<SproutRole> {

  constructor(injector: Injector) {
    super(SproutRole, 'roles', injector);
   }
}
