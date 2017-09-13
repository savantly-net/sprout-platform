import { Injectable } from '@angular/core';
import { ForStatement } from 'typescript';

export const defaultMenuId = 'mainMenu';
export class MenuBase {
  id: string;
  title: string;
  isPublic: boolean;
  roles: string[];
  items?: MenuItem[];
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
  };

  constructor (options: any) {
    this.id = options.id || defaultMenuId;
    this.isPublic = options.isPublic || true;
    this.items = options.items || [];
    this.roles = options.roles || [];
    this.title = options.title || 'unamed menu item';
  }
}

export enum MenuItemType {
  location,
  dropdown
}

export class MenuItem extends MenuBase {
  menuId: string;
  menuItemType: MenuItemType;
  callback: () => void;
  location: string;

  constructor (options: any) {
    this.menuId = options.menuId;
    this.menuItemId: options.menuItemId,
        title: options.title || 'menu',
        location: options.location,
        menuItemType: options.menuItemType || 'location',
        callback: options.callback,
        isPublic: ((options.isPublic === null || typeof options.isPublic === 'undefined') ? this.isPublic : options.isPublic),
        roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.roles : options.roles),
        position: options.position || 0,
        items: options.items || [],
        shouldRender: shouldRender.bind(this)
  }
}

export class Menu extends MenuBase {
  constructor (menu: MenuBase) {
    super(menu);
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


  function() {

  
    // Add menu item object
    var addMenuItem = function(options) {
      var menuId = options.menuId || this.menuId || defaultMenuId;
      
      var newMenuItem = new MenuItem({
        
      });
      
      if(this instanceof MenuItem){
        this.items.push(newMenuItem);
        return newMenuItem;
      } else {
        validateMenuExistence(menuId);
        // Push new menu item
        this.menus[menuId].items.push(newMenuItem);
        // Return the menu item
        return newMenuItem;
      }
      
    };
    this.addMenuItem = addMenuItem.bind(this);
  
    // Remove existing menu object by menu id
    this.removeMenuItem = function(menuId, menuItemId) {
      // Validate that the menu exists
      validateMenuExistence(menuId);
  
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].menuItemId === menuItemId) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }
  
      // Return the menu object
      return this.menus[menuId];
    };
    
    // Return existing MenuItem object by id
    this.getMenuItem = function(menuId, menuItemId) {
      // Validate that the menu exists
      validateMenuExistence(menuId);
  
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].menuItemId === menuItemId) {
          return this.menus[menuId].items[itemIndex];
        }
      }
  
      // Return the menu object
      throw new Error('menuId + menuItemId was not found');
    };
  
    this.getMenus = function(){
      var menuArray = [];
      for (var property in this.menus) {
          if (this.menus.hasOwnProperty(property)) {
              menuArray.push(this.menus[property]);
          }
      }
      return menuArray;
    };
  
    // Extend prototypes with functions
    Menu.prototype.shouldRender = shouldRender;
    Menu.prototype.addMenuItem = addMenuItem;
    MenuItem.prototype.shouldRender = shouldRender;
    MenuItem.prototype.addMenuItem = addMenuItem;
  
    
    //Adding a main menu
    this.menus.mainMenu = this.addMenu({title:'Navigation'});
    
  }
  
  constructor() { }

}
