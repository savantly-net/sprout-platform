import withAuth from '@okta/okta-react/dist/withOktaAuth';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from '../components/auth/OktaSignInWidget';
import { IRootState } from '../state/reducers';
import { updateAuthentication } from '../state/reducers/authentication';

interface LoginProps extends StateProps, DispatchProps {
  authService: any; // this is actually provided by the okta HOC
  authState: any; // same
  updateAuthentication: Function;
}

const mapStateToProps = ({authentication}: IRootState) => ({
  authentication
});

const mapDispatchToProps = (dispatch:Function) => ({
  updateAuthentication: (authState: string) => dispatch(updateAuthentication(authState))
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export class Login extends Component<LoginProps> {

  baseUrl = process.env.REACT_APP_OKTA_ISSUER || '';

  constructor(props: LoginProps) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  async componentDidMount() {
    console.log(this.props);
    const authenticated = await this.props.authService.getAuthState().isAuthenticated;
    console.log(this.props.authService)
    if (authenticated !== false) {
      this.props.updateAuthentication(this.props.authState);
      console.log('User is authenticated?')
    } else {
      console.log('User is not authenticated')
    }
  }

  onSuccess(res: any) {
    if (res.status === 'SUCCESS') {
      return this.props.authService.redirect({
        sessionToken: res.session.token
      });
   } else {
    // The user can be in another authentication state that requires further action.
    // For more information about these states, see:
    //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }
  }

  onError(err: any) {
    console.log('error logging in', err);
  }

  render() {
    return this.props.authState.isAuthenticated ?
      <Redirect to={{ pathname: '/' }}/> :
      <OktaSignInWidget
        baseUrl={this.baseUrl}
        onSuccess={this.onSuccess}
        onError={this.onError}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Login));
