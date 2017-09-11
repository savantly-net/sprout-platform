angular.module('sproutWiki').run(['Menus', function(Menus){
	
	Menus.addMenu({menuId: 'wikiMenu', isPublic: true, title: 'Wiki'});
	
	Menus.addMenuItem({
		menuId: 'wikiMenu',
		menuItemId: 'wikiMenuItem',
		title: 'Browse', 
		location: '/wiki'
	});
	
	Menus.addMenuItem({
		menuId: 'wikiMenu',
		menuItemId: 'wikiMenuCreateItem',
		title: 'Create', 
		location: '/wiki/create'
	});
	
}]);