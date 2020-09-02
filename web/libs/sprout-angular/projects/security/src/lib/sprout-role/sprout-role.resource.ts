import { EmbeddedResource, Resource } from '@lagoshny/ngx-hal-client';

export class EmbeddedPrivilege extends EmbeddedResource {
    id?: string;
  }
  
  export class RoleResource extends Resource {
    id?: string;
    privileges: EmbeddedPrivilege[];
  }