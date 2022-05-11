import { AppPluginMeta, PluginConfigPageProps } from '@savantly/sprout-api';
import { getApiService, ApiService } from '@savantly/sprout-runtime';
import React, { PureComponent } from 'react';
import { ExampleAppSettings } from '../types';

interface Props extends PluginConfigPageProps<AppPluginMeta<ExampleAppSettings>> {}
interface State {
  message: string;
}

export class ExamplePage1 extends PureComponent<Props, State> {
  backendSvc: ApiService;
  constructor(props: Props) {
    super(props);
    this.backendSvc = getApiService();
    this.state = {
      message: 'Waiting for server...',
    };
  }

  componentDidMount() {
    this.getMessageFromExampleApi();
  }

  getMessageFromExampleApi = () => {
    this.backendSvc.get('/api/example-app').then(value => {
      this.setState({
        message: value.data,
      });
    });
  };

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
