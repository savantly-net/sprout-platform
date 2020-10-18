import { AppPlugin, AppPluginMeta, AppRootProps, KeyValue, PanelPlugin } from '@savantly/sprout-api';
import /* webpackChunkName: "formioCss" */ 'formiojs/dist/formio.full.min.css';
import { ExamplePage2 } from 'plugin/config/ExamplePage2';
import { FormsRootPage } from 'plugin/FormsRootPage';
import { getFormStateModule } from 'plugin/state/FormStateModule';
import { ComponentClass } from 'react';
import { ExamplePage1 } from './plugin/config/ExamplePage1';
import { SimplePanel } from './plugin/SimplePanel';
import './plugin/styles.css';
import { ExampleAppSettings, SimpleOptions } from './plugin/types';

export const plugin = new AppPlugin<ExampleAppSettings>()
  .setRootPage((FormsRootPage as unknown) as ComponentClass<AppRootProps>)
  .addConfigPage({
    title: 'Page 1',
    icon: 'fa fa-info',
    body: ExamplePage1,
    id: 'page1',
  })
  .addConfigPage({
    title: 'Page 2',
    icon: 'fa fa-user',
    body: ExamplePage2,
    id: 'page2',
  });
plugin.init = (meta: AppPluginMeta<KeyValue<any>>) => {
  console.log('appplugin module init');
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
// @ts-ignore
//plugin.routes = (props: AppRootProps<KeyValue<any>>) => PluginRoutes(props);
// @ts-ignore
plugin.stateModule = getFormStateModule;

export const panelPlugins: PanelPlugin[] = [panelPlugin];
