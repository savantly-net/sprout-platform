import { Resource } from "@lagoshny/ngx-hal-client";
import { UserResource } from '../sprout-user/sprout-user.resource';

export class OrganizationResource extends Resource {
    createdBy?: UserResource;
    readonly createdDate?: string;
    lastModifiedBy?: UserResource;
    lastModifiedDate?: string;
    id?: string;
    name?: string;
    _new?: boolean;
}