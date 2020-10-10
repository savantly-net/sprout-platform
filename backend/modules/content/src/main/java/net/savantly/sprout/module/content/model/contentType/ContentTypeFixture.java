
package net.savantly.sprout.module.content.model.contentType;

import java.util.List;

import javax.transaction.Transactional;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.module.content.model.contentField.ContentFieldImpl;
import net.savantly.sprout.module.content.model.fieldType.FieldType;

@Transactional
public class ContentTypeFixture extends AbstractBaseFixture<ContentTypeImpl, ContentTypeRepository>{

	private ContentTypeRepository repository;
	public static final String defaultContentTypeName = "Default Content Type";
	public static final String defalutContentTypeId = "DEFAULT_CONTENT_TYPE";

	public ContentTypeFixture(ContentTypeRepository repository) {
		super(repository);
		this.repository = repository;
	}

	@Override
	public void addDependencies(List<Fixture<?>> fixtures) {
	}

	@Override
	public void addEntities(List<ContentTypeImpl> entities) {
		ContentTypeImpl defaultContentType = repository.findByName(defaultContentTypeName);
		if(null == defaultContentType) {
			entities.add(defaultContentType());
		}
	}

	private ContentTypeImpl defaultContentType() {
		ContentFieldImpl cf = new ContentFieldImpl();
		cf.setName("body");
		cf.setDisplayName("Body");
		cf.setRequired(true);
		cf.setFieldType(FieldType.MARKUP);
		cf.setSortOrder(0);

		ContentTypeImpl ct = new ContentTypeImpl();
		ct.setId(defalutContentTypeId);
		ct.setName(defaultContentTypeName);
		ct.setDescription(defaultContentTypeName);
		ct.getFields().add(cf);
		ct.setUpdateable(false);
		
		return ct;
	}

}
