import { AppPluginMeta, PluginConfigPageProps } from '@savantly/sprout-api';
import { getBackendSrv, BackendSrv } from '@savantly/sprout-runtime';
import React, { PureComponent } from 'react';
import { ExampleAppSettings } from '../types';

interface Props extends PluginConfigPageProps<AppPluginMeta<ExampleAppSettings>> {}
interface State {
  message: string;
}

export class ExamplePage1 extends PureComponent<Props, State> {
  backendSvc: BackendSrv;
  constructor(props: Props) {
    super(props);
    this.backendSvc = getBackendSrv();
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
        message: value,
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
