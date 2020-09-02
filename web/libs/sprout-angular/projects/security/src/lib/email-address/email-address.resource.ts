import { Resource } from "@lagoshny/ngx-hal-client";
import { UserResource } from '../sprout-user/sprout-user.resource';

export class EmailAddressResource extends Resource {
    emailAddress?: string;
    verified?: boolean;
    user?: UserResource;
    primary?: boolean;
}