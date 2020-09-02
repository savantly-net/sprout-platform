import { Injectable, Injector } from '@angular/core';
import { RestService } from '@lagoshny/ngx-hal-client';
import { UserResource } from './sprout-user.resource';

@Injectable({
  providedIn: 'root'
})
export class SproutUserService extends RestService<UserResource> {

  constructor(injector: Injector) {
    super(UserResource, 'users', injector);
   }
}
