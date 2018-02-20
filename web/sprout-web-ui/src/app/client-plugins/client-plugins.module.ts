import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { plugins } from '../../../sprout.conf';
import { SecurityModule } from '@savantly/ngx-security';
import { SproutPluginModule } from '@savantly/ngx-sprout-plugin';
import { Observable } from 'rxjs/Observable';

const log = (msg: string, obj?: any) => {
  console.log('[PluginsModule] ' + msg);
  if (obj) {
    console.log(obj);
  }
}


@NgModule({
  imports: [
    CommonModule,
    SproutPluginModule,
    SecurityModule,
    ...plugins
  ],
  exports: [...plugins],
  declarations: []
})
export class ClientPluginsModule {
  private ngModules: NgModule[] = [];

  getNgModules(): Observable<NgModule[]> {
    return Observable.of(this.ngModules);
  }

  constructor() {
   log('Loaded plugins');
  }
}
