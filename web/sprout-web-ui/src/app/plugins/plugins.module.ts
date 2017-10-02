import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sproutHome } from '../../../sprout.conf';
import { WikiModule } from 'plugins/sprout-wiki';

const log = (msg: string, obj?: any) => {
  console.log('[PluginsModule] ' + msg);
  if (obj) {
    console.log(obj);
  }
}

export function getPlugins(): NgModule[] {
  const pluginArray = [];
  pluginArray.push(WikiModule);
  return pluginArray;
}

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [ getPlugins() ],
  declarations: []
})
export class PluginsModule {

  constructor() {
    log('Finding plugins at: ' + sproutHome);
  }
}
