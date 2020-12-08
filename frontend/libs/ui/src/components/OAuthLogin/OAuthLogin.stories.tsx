import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import { Col } from 'reactstrap';
import { OAuth2Login } from './OAuthLogin';

// This default export determines where your story goes in the story list
export default {
  title: 'Login/OAuthLogin',
  component: OAuth2Login,
  decorators: [(story: any) => <Col>{story()}</Col>]
};

const Template: Story<ComponentProps<typeof OAuth2Login>> = (args) => <OAuth2Login {...args} />;

export const Example = Template.bind({});
Example.args = {
  authorizationUrl: 'https://savantly.mocklab.io/oauth/authorize',
  redirectUri: window.location.href,
  buttonText: 'Mocklab Login',
  clientId: 'mocklab_oidc',
  responseType: 'token',
  scope: 'openid profile email',
  className: 'btn btn-primary',
  onSuccess: (data) => console.log(data),
  onFailure: (error) => console.error(error)
};
