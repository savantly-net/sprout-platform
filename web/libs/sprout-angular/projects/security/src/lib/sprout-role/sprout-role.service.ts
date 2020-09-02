import { Injectable, Injector } from '@angular/core';
import { Resource, RestService, EmbeddedResource } from '@lagoshny/ngx-hal-client';
import { RoleResource } from './sprout-role.resource';



@Injectable({
  providedIn: 'root'
})
export class SproutRoleService extends RestService<RoleResource> {

  constructor(injector: Injector) {
    super(RoleResource, 'roles', injector);
   }
}
