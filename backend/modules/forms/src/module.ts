import { AppPlugin, AppPluginMeta, AppRootProps, KeyValue, PanelPlugin } from '@savantly/sprout-api';
import /* webpackChunkName: "formioCss" */ 'formiojs/dist/formio.full.min.css';
import { ExamplePage2 } from 'plugin/config/ExamplePage2';
import { FormsRootPage } from 'plugin/FormsRootPage';
import { ComponentClass } from 'react';
import { Formio } from 'react-formio';
import { ExamplePage1 } from './plugin/config/ExamplePage1';
import { SimplePanel } from './plugin/SimplePanel';
import './plugin/styles.css';
import { ExampleAppSettings, SimpleOptions } from './plugin/types';

const currentSite = `${location.protocol}//${location.host}/api/savantly-forms`;
const PROJECT_URL = currentSite;
const API_URL = currentSite;

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
  const query: KeyValue = {};
  window.location.search
    .substr(1)
    .split('&')
    .forEach(function(item) {
      query[item.split('=')[0]] = item.split('=')[1] && decodeURIComponent(item.split('=')[1]);
    });

  const projUrl = query.projectUrl || PROJECT_URL;
  const apiUrl = query.apiUrl || API_URL;
  Formio.setProjectUrl(projUrl);
  Formio.setBaseUrl(apiUrl);
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
