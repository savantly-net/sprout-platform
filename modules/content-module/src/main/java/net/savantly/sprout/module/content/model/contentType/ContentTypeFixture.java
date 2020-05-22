
package net.savantly.sprout.module.content.model.contentType;

import java.util.List;

import javax.transaction.Transactional;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.module.content.model.contentField.ContentField;
import net.savantly.sprout.module.content.model.fieldType.FieldType;

@Transactional
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
		ContentType defaultContentType = repository.findByName(defaultContentTypeName);
		if(null == defaultContentType) {
			entities.add(defaultContentType());
		}
	}

	private ContentType defaultContentType() {
		ContentField cf = new ContentField();
		cf.setName("body");
		cf.setDisplayName("Body");
		cf.setRequired(true);
		cf.setFieldType(FieldType.markup);
		cf.setSortOrder(0);

		ContentType ct = new ContentType();
		ct.setName(defaultContentTypeName);
		ct.setDescription(defaultContentTypeName);
		ct.getFields().add(cf);
		ct.setUpdateable(false);
		
		cf.setContentType(ct);
		
		return ct;
	}

}
