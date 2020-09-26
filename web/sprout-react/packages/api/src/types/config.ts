import { PanelPluginMeta } from './panel';

/**
 * Describes the build information that will be available via the Grafana configuration.
 *
 * @public
 */
export interface BuildInfo {
  version: string;
  commit: string;
  /**
   * Is set to true when running Grafana Enterprise edition.
   *
   * @deprecated use `licenseInfo.hasLicense` instead
   */
  isEnterprise: boolean;
  env: string;
  edition: string;
  latestVersion: string;
  hasUpdate: boolean;
  hideVersion: boolean;
}

/**
 * Describes available feature toggles in Grafana. These can be configured via the
 * `conf/custom.ini` to enable features under development or not yet available in
 * stable version.
 *
 * @public
 */
export interface FeatureToggles {
  live: boolean;
  expressions: boolean;

  /**
   * @remarks
   * Available only in Grafana Enterprise
   */
  meta: boolean;
  datasourceInsights: boolean;
  reportGrid: boolean;
  standaloneAlerts: boolean;
}

/**
 * Describes the license information about the current running instance of Grafana.
 *
 * @public
 */
export interface LicenseInfo {
  hasLicense: boolean;
  expiry: number;
  licenseUrl: string;
  stateInfo: string;
}

/**
 * Describes all the different Sprout configuration values available for an instance.
 *
 * @public
 */
export interface SproutConfig {
  panels: { [key: string]: PanelPluginMeta };
  minRefreshInterval: string;
  appSubUrl: string;
  windowTitlePrefix: string;
  buildInfo: BuildInfo;
  newPanelTitle: string;
  bootData: any;
  externalUserMngLinkUrl: string;
  externalUserMngLinkName: string;
  externalUserMngInfo: string;
  allowOrgCreate: boolean;
  disableLoginForm: boolean;
  defaultDatasource: string;
  alertingEnabled: boolean;
  alertingErrorOrTimeout: string;
  alertingNoDataOrNullValues: string;
  alertingMinInterval: number;
  authProxyEnabled: boolean;
  exploreEnabled: boolean;
  ldapEnabled: boolean;
  samlEnabled: boolean;
  autoAssignOrg: boolean;
  verifyEmailEnabled: boolean;
  oauth: any;
  disableUserSignUp: boolean;
  loginHint: any;
  passwordHint: any;
  loginError: any;
  navTree: any;
  viewersCanEdit: boolean;
  editorsCanAdmin: boolean;
  disableSanitizeHtml: boolean;
  pluginsToPreload: string[];
  licenseInfo: LicenseInfo;
  http2Enabled: boolean;
}
