// TS adapted from https://github.com/bhubr/react-simple-oauth2-login/blob/master/src/OAuth2Login.jsx
import React, { Component, ReactNode } from 'react';
import PopupWindow from '../../util/PopupWindow';
import { toQuery } from '../../util/url';

const defaultProps = {
  autoLogin: false,
  buttonText: 'Login',
  scope: '',
  state: '',
  className: '',
  children: undefined as ReactNode,
  onRequest: () => {}
};

type DefaultProps = Readonly<typeof defaultProps>;

export type OAuth2LoginProps = {
  autoLogin?: boolean;
  authorizationUrl: string;
  clientId: string;
  redirectUri: string;
  responseType: 'code' | 'token';
  onSuccess: (data: any) => any;
  onFailure: (error: any) => any;
} & DefaultProps;

interface Payload {
  client_id: string;
  scope: string;
  redirect_uri: string;
  response_type: 'code' | 'token';
  state?: string;
  nonce?: string;
}

const responseTypeLocationKeys = {
  code: 'search',
  token: 'hash'
};

const responseTypeDataKeys = {
  code: 'code',
  token: 'access_token'
};

export class OAuth2Login extends Component<OAuth2LoginProps> {
  popup?: PopupWindow;
  static defaultProps = defaultProps;

  constructor(props: OAuth2LoginProps) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
    this.onRequest = this.onRequest.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  onBtnClick() {
    const { buttonText, authorizationUrl, clientId, scope, redirectUri, state, responseType } = this.props;
    const payload: Payload = {
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
      response_type: responseType,
      nonce: 'fixme'
    };
    if (state) {
      payload.state = state;
    }
    const search = toQuery(payload);
    const width = 680;
    const height = 440;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const locationKey = responseTypeLocationKeys[responseType];
    console.log(`opening popup window: ${authorizationUrl}?${search}`);
    const popup = PopupWindow.open(
      buttonText,
      `${authorizationUrl}?${search}`,
      {
        height,
        width,
        top,
        left
      },
      {
        locationKey
      }
    );
    this.popup = popup;

    this.onRequest();
    popup.then(this.onSuccess)?.catch(this.onFailure);
  }

  componentDidMount() {
    if (this.props.autoLogin) {
      this.onBtnClick();
    }
  }

  onRequest() {
    const { onRequest } = this.props;
    onRequest();
  }

  onSuccess(data: any) {
    const { responseType, onSuccess } = this.props;
    const responseKey = responseTypeDataKeys[responseType];
    if (!data[responseKey]) {
      console.error('received data', data);
      return this.onFailure(new Error(`'${responseKey}' not found in received data`));
    }

    return onSuccess(data);
  }

  onFailure(error: any) {
    const { onFailure } = this.props;
    onFailure(error);
  }

  render() {
    const { className, buttonText, children } = this.props;
    const attrs = { onClick: this.onBtnClick, className: '' };

    if (className) {
      attrs.className = className;
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    return (
      <button type="button" {...attrs}>
        {children || buttonText}
      </button>
    );
  }
}
