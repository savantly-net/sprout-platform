import { Injectable } from '@angular/core';

export const defaultMenuId = 'mainMenu';
export class MenuBase {
  id: string;
  title: string;
  isPublic: boolean;
  roles: string[];
  items: MenuItem[];
  position: number;
  shouldRender(user) {
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
  addMenuItem(options) {
    const menuId = options.menuId || this.id || defaultMenuId;

    if (this.items.findIndex(x => x.id === options.id) > -1) {
      throw new Error('Item with this id: "' + options.id + '" already exists in menu: ' + menuId);
    } else {
      this.items.push(new MenuItem(options));
    }

    this.items.push(new MenuItem(options));
      const index = this.items.findIndex(x => x.id === options.id);
      return this.items[index];
  }

  // Remove menu item object
  removeMenuItem(id): void {
    const index = this.items.findIndex(x => x.id === id);
    if (index === -1) {
      throw new Error('Item with this id doesn\'t exist' + id);
    } else {
      this.items.slice(index, 1);
    }
  }

  getMenuItem(id): MenuItem {
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
  }
}

export enum MenuItemType {
  location,
  dropdown
}

export class MenuItem extends MenuBase {
  menuItemType: MenuItemType;
  callback: () => void;
  location: string;

  constructor (options: any) {
    super(options);
    this.location = options.location;
    this.menuItemType = options.menuItemType || MenuItemType.location;
    this.callback = options.callback;
  }
}

export class Menu extends MenuBase {
  constructor (options: any) {
    super(options);
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
