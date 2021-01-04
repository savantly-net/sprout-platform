import { AppPlugin, AppPluginMeta, AppRootProps, KeyValue, PanelPlugin } from '@savantly/sprout-api';
import /* webpackChunkName: "formioCss" */ 'formiojs/dist/formio.full.min.css';
import { FormsRootPage } from 'plugin/FormsRootPage';
import { ComponentClass } from 'react';
import { SimplePanel } from './plugin/SimplePanel';
import './plugin/styles.css';
import { ExampleAppSettings, SimpleOptions } from './plugin/types';

export const plugin = new AppPlugin<ExampleAppSettings>().setRootPage(
  (FormsRootPage as unknown) as ComponentClass<AppRootProps>
);
plugin.init = (meta: AppPluginMeta<KeyValue<any>>) => {
  console.log('forms module init');
};

const panelPlugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  return builder
    .addTextInput({
      path: 'text',
      name: 'Simple text option',
      description: 'Description of panel option',
      defaultValue: 'Default value of text input option',
    })
    .addBooleanSwitch({
      path: 'showMessage',
      name: 'Show message',
      defaultValue: false,
    })
    .addRadio({
      path: 'messageSize',
      defaultValue: 'sm',
      name: 'Message size',
      settings: {
        options: [
          {
            value: 'sm',
            label: 'Small',
          },
          {
            value: 'md',
            label: 'Medium',
          },
          {
            value: 'lg',
            label: 'Large',
          },
        ],
      },
      showIf: config => config.showMessage,
    });
});

export const panelPlugins: PanelPlugin[] = [panelPlugin];
