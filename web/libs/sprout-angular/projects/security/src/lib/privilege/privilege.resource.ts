import { Resource } from "@lagoshny/ngx-hal-client";
import { RoleResource } from '../sprout-role/sprout-role.resource';

export class PrivilegeResource extends Resource {
    readonly createdDate?: string;
    lastModifiedDate?: string;
    id?: string;
    roles?: Array<RoleResource>;
    authority?: string;
    _new?: boolean;
}