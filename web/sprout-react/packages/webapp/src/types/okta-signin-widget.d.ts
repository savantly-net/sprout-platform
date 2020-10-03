declare module '@okta/okta-signin-widget';

declare class OktaSignIn {
    [x: string]: any;
    constructor(configuration: OktaSignInConfig);
  }
  
  interface OktaSignIn {
    renderEl(configuration: { el: Element | Text | string }, onSuccess: Function, onError: Function): void;
    remove(): void;
  
    session: {
      get: (callback: (repsonse: any) => void) => void;
    };
  }
  
  interface OktaSignInConfigAuthParams {
    issuer: string;
    display: 'page';
    scopes: string[];
    responseType: string[];
  }
  
  interface OktaSignInConfigi18n {
    en: {
      'primaryauth.username.placeholder': string;
      'primaryauth.username.tooltip': string;
      'error.username.required': string;
      'error.password.required': string;
    };
  }
  
  interface OktaSignInConfig {
    baseUrl: string;
    logo: string;
    clientId?: string;
    redirectUri?: string;
    authParams: OktaSignInConfigAuthParams;
    i18n: OktaSignInConfigi18n;
  }