import { EmbeddedResource, Resource } from '@lagoshny/ngx-hal-client';
import { PrivilegeResource } from '../privilege';
import { EmailAddressResource } from '../email-address';
import { OrganizationResource } from '../organization';
import { GrantedAuthorityResource } from '../granted-authority';
import { RoleResource } from '../sprout-role/sprout-role.resource';
  
export class UserResource extends Resource {
  id?: string;
  displayName?: string;
  primaryEmailAddress?: EmailAddressResource;
  firstName?: string;
  lastName?: string;
  gravatarUrl?: string;
  phoneNumber?: string;
  organization?: OrganizationResource;
  hidePrimaryEmailAddress?: boolean;
  emailAddresses?: Array<EmailAddressResource>;
  enabled?: boolean;
  authorities?: Array<GrantedAuthorityResource>;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  username?: string;
  password?: string;
  clearTextPassword?: string; // only used for sending to server. does not return from server

  roles: RoleResource[];
}