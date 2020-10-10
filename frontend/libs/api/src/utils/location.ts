import { SproutConfig } from '../types';
import { textUtil } from '../text';

let sproutConfig: () => SproutConfig;

/**
 *
 * @param url
 * @internal
 */
const stripBaseFromUrl = (url: string): string => {
  const appSubUrl = sproutConfig ? sproutConfig().appSubUrl : '';
  const stripExtraChars = appSubUrl.endsWith('/') ? 1 : 0;
  const urlWithoutBase =
    url.length > 0 && url.indexOf(appSubUrl) === 0 ? url.slice(appSubUrl.length - stripExtraChars) : url;

  return urlWithoutBase;
};

/**
 *
 * @param url
 * @internal
 */
const assureBaseUrl = (url: string): string => {
  if (url.startsWith('/')) {
    return `${sproutConfig ? sproutConfig().appSubUrl : ''}${stripBaseFromUrl(url)}`;
  }
  return url;
};

interface LocationUtilDependencies {
  getConfig: () => SproutConfig;
}

export const locationUtil = {
  /**
   *
   * @param getConfig
   * @param buildParamsFromVariables
   * @param getTimeRangeForUrl
   * @internal
   */
  initialize: ({ getConfig }: LocationUtilDependencies) => {
    sproutConfig = getConfig;
  },
  stripBaseFromUrl,
  assureBaseUrl,
  processUrl: (url: string) => {
    return sproutConfig().disableSanitizeHtml ? url : textUtil.sanitizeUrl(url);
  },
};
