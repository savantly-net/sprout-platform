import config from '../config';
import _ from 'lodash';

export class User {
  id?: number;
  isGrafanaAdmin: any;
  isSignedIn: any;
  orgRole: any;
  orgId?: number;
  orgName?: string;
  login?: string;
  orgCount?: number;
  timezone?: string;
  helpFlags1?: number;
  lightTheme: boolean = true;
  hasEditPermissionInFolders: boolean = true;

  constructor() {
    if (config.bootData.user) {
      _.extend(this, config.bootData.user);
    }
  }
}

export class ContextSrv {
  pinned: any;
  version: any;
  user: User;
  isSignedIn: any;
  isGrafanaAdmin: any;
  isEditor: any;
  sidemenuSmallBreakpoint = false;
  hasEditPermissionInFolders: boolean;

  constructor() {
    if (!config.bootData) {
      config.bootData = { user: {}, settings: {}, navTree: {} };
    }

    this.user = new User();
    this.isSignedIn = this.user.isSignedIn;
    this.isGrafanaAdmin = this.user.isGrafanaAdmin;
    this.isEditor = this.hasRole('Editor') || this.hasRole('Admin');
    this.hasEditPermissionInFolders = this.user.hasEditPermissionInFolders;
  }

  hasRole(role: string) {
    return this.user.orgRole === role;
  }

  isGrafanaVisible() {
    return !!(document.visibilityState === undefined || document.visibilityState === 'visible');
  }
}

const contextSrv = new ContextSrv();
export { contextSrv };