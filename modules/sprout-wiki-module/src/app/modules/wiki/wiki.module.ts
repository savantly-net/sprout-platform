import { WikiComponent } from './wiki.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SproutPlugin, SproutPluginRegistryService } from '@savantly/ngx-sprout-plugin';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [WikiComponent],
  declarations: [WikiComponent],
  providers: []
})
export class WikiModule implements SproutPlugin {
    name: string;
  template: any;

  constructor(registry: SproutPluginRegistryService) {
    this.name = 'wiki-plugin';
    this.template = '<h1>Hello from the wiki plugin registration</h1>';

    registry.register(this);
  }
}
