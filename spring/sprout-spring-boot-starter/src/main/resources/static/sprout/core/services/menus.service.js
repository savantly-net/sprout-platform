'use strict';

// Menu service used for managing  menus
// Examples -

// menuItemType = dropdown | item
//
// Add a menu Item
// Menus.addMenuItem(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position)

// Add a submenu Item
// Menus.addSubMenuItem(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position)
/**
 * Examples -
 * 
 * var fileMenu = Menus.addMenu({menuId: 'fileMenu', title: 'File', roles: ['ADMIN']});
 * 
 * Menus.addMenuItem({
 * 		menuId: 'fileMenu', 
 * 		menuItemId: 'newFileMenuItem',
 * 		title: 'New',
 * 		menuItemType: 'location', 
 *		location: '/file/create', 
 *		isPublic: false, 
 *		roles: ['user'], 
 *		position: 1
 * });
 * 
 * fileMenu.addMenuItem({
 * 		menuItemId: 'exportFileMenuItem',
 * 		title: 'Export',
 * 		menuItemType: 'callback', 
 *		callback: function($event){console.log($event);}, 
 *		isPublic: false, 
 *		roles: ['user'], 
 *		position: 1
 * });
 * 
 * var exportFileMenuItem = fileMenu.getMenuItem('exportFileMenuItem');
 * exportFileMenuItem.addMenuItem({
 * 		menuItemId: 'exportDocFileMenuItem',
 * 		title: 'Doc',
 * 		menuItemType: 'callback', 
 *		callback: function($event){console.log($event);}, 
 *		isPublic: false, 
 *		roles: ['user'], 
 *		position: 1
 * });
 * 
 */
angular.module('core').service('Menus', [

	function() {
		var defaultMenuId = 'mainMenu';

		// Define the menus object
		this.menus = {};
		
		function Menu(options){
			// Define a set of default roles
			this.defaultRoles = ['*'];
			this.menuId = options.menuId || defaultMenuId;
			this.title = options.title || 'menu';
			this.isPublic = options.isPublic || false;
			this.roles = options.roles || this.defaultRoles;
			this.items = options.items || [];
		}
		
		function MenuItem(options){
			// Define a set of default roles
			this.defaultRoles = ['*'];
			this.menuId = options.menuId || defaultMenuId;
			this.menuItemId = options.menuItemId;
			this.menuItemType = options.menuItemType || 'location';
			this.callback = options.callback;
			this.location = options.location || '';
			this.title = options.title || 'menu';
			this.isPublic = options.isPublic || false;
			this.roles = options.roles || this.defaultRoles;
			this.items = options.items || [];
		}
		
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
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
		

		// Validate menu existence
		var validateMenuExistence = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		}.bind(this);

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			validateMenuExistence(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(options) {
			var menuId = options.menuId || defaultMenuId;
			// Create the new menu
			this.menus[menuId] = new Menu({
				title: options.title || 'menu',
				isPublic: options.isPublic || false,
				roles: options.roles || this.defaultRoles,
				items: options.items || []
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			validateMenuExistence(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		var addMenuItem = function(options) {
			var menuId = options.menuId || this.menuId || defaultMenuId;
			
			var newMenuItem = new MenuItem({
				menuId: menuId,
				menuItemId: options.menuItemId,
				title: options.title || 'menu',
				location: options.location,
				menuItemType: options.menuItemType || 'location',
				callback: options.callback,
				isPublic: ((options.isPublic === null || typeof options.isPublic === 'undefined') ? this.isPublic : options.isPublic),
				roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.roles : options.roles),
				position: options.position || 0,
				items: options.items || [],
				shouldRender: shouldRender.bind(this)
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
]);