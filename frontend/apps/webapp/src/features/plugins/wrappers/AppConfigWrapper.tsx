// Libraries
import { Button } from '@savantly/sprout-ui';
import { AppPlugin, AppRootProps, KeyValue, PluginMeta } from '@savantly/sprout-api';
import { css } from 'emotion';
import cloneDeep from 'lodash/cloneDeep';
import extend from 'lodash/extend';
import React, { ComponentClass, PureComponent } from 'react';
import { sproutApiSvc } from '../../../core/services/sproutApiSvc';

interface Props {
  app: AppPlugin;
}

interface State {
  component?: ComponentClass<AppRootProps<KeyValue<any>>, any>;
  refresh: number;
}

export class AppConfigCtrlWrapper extends PureComponent<Props, State> {

  model: PluginMeta;

  constructor(props: Props) {
    super(props);
    this.state = {
        component: props.app.root,
      refresh: 0,
    };

    // Set a copy of the meta
    this.model = cloneDeep(this.props.app.meta);
  }

  render() {
    const model = this.model;

    const withRightMargin = css({ marginRight: '8px' });

    return (
      <div>
        {this.state.component}
        <br />
        <br />
        {model && (
          <div className="gf-form">
            {!model.enabled && (
              <Button variant="primary" onClick={this.enable} className={withRightMargin}>
                Enable
              </Button>
            )}
            {model.enabled && (
              <Button variant="primary" onClick={this.update} className={withRightMargin}>
                Update
              </Button>
            )}
            {model.enabled && (
              <Button variant="destructive" onClick={this.disable} className={withRightMargin}>
                Disable
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }

  //-----------------------------------------------------------
  // Copied from plugin_edit_ctrl
  //-----------------------------------------------------------

  update = () => {
    const pluginId = this.model.id;
    const updateCmd = extend(
        {
          enabled: this.model.enabled,
          pinned: this.model.pinned,
          jsonData: this.model.jsonData,
          secureJsonData: this.model.secureJsonData,
        },
        {}
      );
      return sproutApiSvc.post(`/api/plugins/${pluginId}/settings`, updateCmd);
  };

  enable = () => {
    this.model.enabled = true;
    this.model.pinned = true;
    this.update();
  };

  disable = () => {
    this.model.enabled = false;
    this.model.pinned = false;
    this.update();
  };
}