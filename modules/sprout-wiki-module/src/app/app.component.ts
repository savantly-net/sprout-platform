import { Component } from '@angular/core';
import { MenuComponent, MenuService, Menu } from '@savantly/ngx-menu';

@Component({
  selector: 'sv-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private menuService: MenuService) {
    menuService.getMenus().subscribe(menus => {
      const menuItem = new Menu({
        id: 'example',
        text: 'test',
        isPublic: true,
        roles: ['*'],
        items: [],
        position: 0,
        disabled: false,
        icon: '',
        callback: () => {}
      });
      menus[0].addMenuItem(menuItem);
    });
  }

}
