
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

export interface OktaProps {
    baseUrl: string;
    onSuccess: Function;
    onError: Function;
}

export default class OktaSignInWidget extends Component<OktaProps> {
    widget!: OktaSignIn
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl,
      authParams: {
        // If your app is configured to use the Implicit Flow 
        // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
        // you will need to uncomment the below line
        //pkce: false
      }
    });
    if(el) {
      this.widget.renderEl({el}, this.props.onSuccess, this.props.onError);
    }
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return <div />;
  }
};