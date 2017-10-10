
package net.savantly.sprout.core.content.contentType;

import java.util.List;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplate;

public class ContentTypeFixture extends AbstractBaseFixture<ContentType, ContentTypeRepository>{

	private ContentTypeRepository repository;
	public static final String defaultContentTypeName = "Default Content Type";

	public ContentTypeFixture(ContentTypeRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public void addDependencies(List<Fixture<?>> fixtures) {
	}

	@Override
	public void addEntities(List<ContentType> entities) {
		entities.add(defaultContentType());
	}

	private ContentType defaultContentType() {
		ContentField cf = new ContentField();
		cf.setName("body");
		cf.setDisplayName("Body");
		cf.setRequired(true);
		cf.setSortOrder(0);
		
		ContentTemplate template = new ContentTemplate();
		template.setContent("${body}");
		
		
		ContentType ct = new ContentType();
		ct.setName(defaultContentTypeName);
		ct.setTemplate(template);
		ct.getFields().add(cf);
		ct.setUpdateable(false);
		cf.setContentType(ct);
		
		return ct;
	}

}
