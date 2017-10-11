
package net.savantly.sprout.core.content.contentType;

import java.util.List;

import net.savantly.spring.fixture.AbstractBaseFixture;
import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplate;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateFixture;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateRepository;
import net.savantly.sprout.core.content.fieldType.FieldType;

public class ContentTypeFixture extends AbstractBaseFixture<ContentType, ContentTypeRepository>{

	private ContentTypeRepository repository;
	private ContentTemplateFixture contentTemplateFixture;
	private ContentTemplateRepository cTemplateRepository;
	public static final String defaultContentTypeName = "Default Content Type";

	public ContentTypeFixture(ContentTypeRepository repository, ContentTemplateFixture contentTemplateFixture, ContentTemplateRepository cTemplateRepository) {
		super(repository);
		this.repository = repository;
		this.contentTemplateFixture = contentTemplateFixture;
		this.cTemplateRepository = cTemplateRepository;
	}

	@Override
	public void addDependencies(List<Fixture<?>> fixtures) {
		fixtures.add(contentTemplateFixture);
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
		cf.setFieldType(FieldType.text);
		cf.setSortOrder(0);
		
		ContentTemplate template = cTemplateRepository.findByName(ContentTemplateFixture.defaultContentTemplateName);
		
		ContentType ct = new ContentType();
		ct.setName(defaultContentTypeName);
		ct.setDescription(defaultContentTypeName);
		ct.setTemplate(template);
		ct.getFields().add(cf);
		ct.setUpdateable(false);
		
		cf.setContentType(ct);
		template.getContentTypes().add(ct);
		
		return ct;
	}

}
