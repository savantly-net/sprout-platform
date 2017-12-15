package net.savantly.sprout.wiki;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.content.contentType.ContentType;
import net.savantly.sprout.core.content.contentType.ContentTypeRepository;
import net.savantly.sprout.core.content.fieldType.FieldType;
import net.savantly.sprout.core.domain.menu.Menu;
import net.savantly.sprout.core.domain.menu.MenuRepository;
import net.savantly.sprout.wiki.repository.WikiItemRepository;

/** 
 * Add some fixture stuff, like a menu and default wiki page
 * @author jdb6853
 *
 */
@Component
public class WikiFixture {
	static final String DEFAULT_WIKI_MENU_ID = "SPROUT-WIKI";
	static final String DEFAULT_WIKI_MENU_NAME = "Wiki";
	static final String DEFAULT_CONTENT_TYPE_NAME = "Wiki";
	static final String DEFAULT_WIKI_CONTENT_TYPE_DESCRIPTION = "A custom content type for the wiki plugin";

	@Autowired
	private MenuRepository menuRepository;
	@Autowired
	private ContentTypeRepository contentTypes;
	@Autowired
	private WikiItemRepository wikiRepository;

	public void install() throws Exception {
		ensureMenuItemsExist();
		ensureDefaultWikiItemExists();
		ensureContentTypeExists();
	}
	
	private void ensureContentTypeExists() {
		ContentType ct = contentTypes.findOne(DEFAULT_CONTENT_TYPE_NAME);
		if (ct == null) {
			ct = new ContentType();
			ct.setId(DEFAULT_CONTENT_TYPE_NAME);
			ct.setName(DEFAULT_CONTENT_TYPE_NAME);
			ct.setCreatedBy(WikiModule.BEAN_NAME);
			ct.setRequiresTemplate(false);
			ct.setDescription(DEFAULT_WIKI_CONTENT_TYPE_DESCRIPTION);
			ct.setFields(getFields(ct));
			contentTypes.save(ct);
		}
	}

	private Set<ContentField> getFields(ContentType ct) {

		Set<ContentField> fields = new HashSet<ContentField>();
		
		// Title Field
		ContentField titleField = new ContentField();
		titleField.setCreatedBy(WikiModule.BEAN_NAME);
		titleField.setDisplayName("Title");
		titleField.setFieldType(FieldType.text);
		titleField.setName("title");
		titleField.setRequired(true);
		titleField.setSortOrder(0);
		titleField.setContentType(ct);
		
		fields.add(titleField);
		
		// Body Field
		ContentField bodyField = new ContentField();
		bodyField.setCreatedBy(WikiModule.BEAN_NAME);
		bodyField.setDisplayName("Body");
		bodyField.setFieldType(FieldType.markup);
		bodyField.setName("body");
		bodyField.setRequired(false);
		bodyField.setSortOrder(1);
		bodyField.setContentType(ct);
		
		fields.add(bodyField);
		
		return fields;
	}

	public void uninstall() throws Exception {
		ensureMenuItemsRemoved();
	}

	private void ensureMenuItemsRemoved() {
		Menu menu = menuRepository.findOne(DEFAULT_WIKI_MENU_ID);
		if (menu == null) {
			menuRepository.delete(menu);
		}
	}

	private void ensureDefaultWikiItemExists() {
		// TODO Auto-generated method stub
		
	}

	private void ensureMenuItemsExist() {
		Menu menu = menuRepository.findOne(DEFAULT_WIKI_MENU_ID);
		if (menu == null) {
			menu = new Menu();
			menu.setIcon("bookmark");
			menu.setId(DEFAULT_WIKI_MENU_ID);
			menu.setDisplayText(DEFAULT_WIKI_MENU_NAME);
			menu.setUrl("plugins;id="+WikiModule.BEAN_NAME);
			menuRepository.save(menu);
		}
	}

}
