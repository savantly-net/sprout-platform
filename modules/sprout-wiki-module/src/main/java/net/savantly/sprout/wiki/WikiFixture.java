package net.savantly.sprout.wiki;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import net.savantly.sprout.core.domain.menu.Menu;
import net.savantly.sprout.core.domain.menu.MenuRepository;
import net.savantly.sprout.wiki.repository.WikiItemRepository;

/** 
 * Add some fixture stuff, like a menu and default wiki page
 * @author jdb6853
 *
 */
@Component
public class WikiFixture implements InitializingBean {
	
	static final String DEFAULT_WIKI_MENU_NAME = "Wiki";

	@Autowired
	MenuRepository menuRepository;
	
	@Autowired
	WikiItemRepository wikiRepository;

	@Override
	public void afterPropertiesSet() throws Exception {
		ensureMenuItemsExist();
		ensureDefaultWikiItemExists();
	}

	private void ensureDefaultWikiItemExists() {
		// TODO Auto-generated method stub
		
	}

	private void ensureMenuItemsExist() {
		Menu menu = menuRepository.findOne(DEFAULT_WIKI_MENU_NAME);
		if (menu == null) {
			menu = new Menu();
			menu.setId(DEFAULT_WIKI_MENU_NAME);
			menu.setDisplayText(DEFAULT_WIKI_MENU_NAME);
			menu.setUrl("plugins/sprout-wiki");
			menuRepository.save(menu);
		}
	}

}
