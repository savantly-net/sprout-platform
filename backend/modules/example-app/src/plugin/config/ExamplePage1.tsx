import { AppPluginMeta, PluginConfigPageProps } from '@savantly/sprout-api';
import React, { PureComponent } from 'react';
import { ExampleAppSettings } from '../types';

interface Props extends PluginConfigPageProps<AppPluginMeta<ExampleAppSettings>> {}

export class ExamplePage1 extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { query } = this.props;

    return (
      <div>
        11111111111111111111111111111111
        <pre>{JSON.stringify(query)}</pre>
        11111111111111111111111111111111
      </div>
    );
  }
}
