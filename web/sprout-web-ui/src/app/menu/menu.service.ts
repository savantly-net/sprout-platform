import { User } from '../security/user/user.component';
import { Injectable } from '@angular/core';

export const defaultMenuId = 'mainMenu';

export enum MenuItemType {
  location,
  dropdown
}

export interface IMenu {
  id: string;
  title: string;
  isPublic: boolean;
  roles: string[];
  items: IMenu[];
  position: number;
  menuItemType: MenuItemType;
  location: string;
  callback: () => void;
  shouldRender: (user: User) => boolean;
  addMenuItem: (item: any) => IMenu;
  /*
   * Returns true is delete is successful
   */
  removeMenuItem: (id: string) => boolean;
  getMenuItem: (id: string) => IMenu;
}

export class Menu implements IMenu {
  id: string;
  title: string;
  isPublic: boolean;
  roles: string[];
  items: IMenu[];
  position: number;
  menuItemType: MenuItemType;
  callback: () => void;
  location: string;

  shouldRender(user: User): boolean {
    if (user) {
      if (this.roles.indexOf('*') > -1) {
        return true;
      } else {
        for (let userRoleIndex of user.roles) {
          for (let roleIndex of this.roles) {
            if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
              return true;
            }
          }
        }
      }
    } else {
      return this.isPublic;
    }
    return false;
  }

  // Add menu item object
  addMenuItem(item: IMenu) {
    if (this.items.findIndex(x => x.id === item.id) > -1) {
      throw new Error('Item with this id: "' + item.id + '" already exists in menu: ' + this.id);
    } else {
      this.items.push(item);
    }
    const index = this.items.findIndex(x => x.id === item.id);
    return this.items[index];
  }

  // Remove menu item object
  removeMenuItem(id): boolean {
    const index = this.items.findIndex(x => x.id === id);
    if (index === -1) {
      throw new Error('Item with this id doesn\'t exist' + id);
    } else {
      this.items.slice(index, 1);
    }
    return true;
  }

  getMenuItem(id): IMenu {
    const index = this.items.findIndex(x => x.id === id);
    if (index === -1) {
      throw new Error('Menu item was not found: ' + id);
    } else {
      return this.items[index];
    }
  }

  constructor (options: any) {
    this.id = options.id || defaultMenuId;
    this.isPublic = options.isPublic || true;
    this.items = options.items || [];
    this.roles = options.roles || ['*'];
    this.title = options.title || 'unamed menu item';
    this.location = options.location;
    this.menuItemType = options.menuItemType || MenuItemType.location;
    this.callback = options.callback;
  }
}

@Injectable()
export class MenuService {
  // internal menus object
  menus: Menu[];

  menuExists(menuId: string): boolean {
    this.menus.map(menu => {
      if (menu.id === menuId) {
        return true;
      }
    });
    return false;
  }

  // Validate menu existence
  validateMenuExistence(menuId): Menu {
    let response = null;
    if (menuId && menuId.length) {
      this.menus.map(menu => {
        if (menu.id === menuId) {
          response = menu;
        }
      });
    }
    if (response === null) {
      throw new Error('Menu does not exist: ' + menuId);
    } else {
      return response;
    }
  }

  // Get the menu object by menu id
  getMenu(menuId): Menu {
    // Validate that the menu exists and return it
    return this.validateMenuExistence(menuId);
  };

  // Add new menu object by menu id
  addMenu(menu: Menu) {
    if (this.menuExists(menu.id)) {
      throw new Error ('Menu already exists with this id: ' + menu.id);
    } else {
      let index = this.menus.push(menu);
      return this.menus[index - 1];
    }
  };

  // Remove existing menu object by menu id
  removeMenu(menuId: string): boolean {
    // Validate that the menu exists
    const index = this.menus.findIndex(x => x.id === menuId);
    if (index > -1) {
      this.menus.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  constructor() {
    this.menus = [];
    this.menus.push(new Menu({title: 'Navigation'}));
  }

}
