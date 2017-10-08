import { WikiComponent } from './wiki.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SproutPlugin, SproutPluginRegistryService } from '@savantly/ngx-sprout-plugin';
import { MenuService, IMenu, Menu } from '@savantly/ngx-menu';

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
  wikiMenu: IMenu = new Menu({id: 'wikiMenu', text: 'Wiki'})

  constructor(registry: SproutPluginRegistryService, menuService: MenuService) {
    this.name = 'wiki-plugin';
    this.template = '<h1>Hello from the wiki plugin registration</h1>';

    registry.register(this);
    this.wikiMenu.addMenuItem(new Menu({
      id: 'browseWiki',
      text: 'Browse',
      callback: () => {
        alert('Browsing the wiki is not implemented yet!');
      }
    }));
    menuService.addMenu(this.wikiMenu);
  }
}
