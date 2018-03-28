package net.savantly.sprout.core.content.contentItem;

import java.util.Set;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplate;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateFixture;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateRepository;
import net.savantly.sprout.core.content.contentType.ContentType;
import net.savantly.sprout.core.content.contentType.ContentTypeFixture;
import net.savantly.sprout.core.content.contentType.ContentTypeRepository;
import net.savantly.sprout.core.content.fieldType.FieldType;


@RunWith(SpringRunner.class)
@ContextConfiguration
@TestPropertySource("classpath:application.properties")
public class ContentItemTest {
	
	static final String defaultContentTypeName = "Default Content Type";
	private static Logger log = LoggerFactory.getLogger(ContentItemTest.class);
	
	@Autowired
	ContentTypeRepository contentTypeRepository;
	@Autowired
	ContentTemplateRepository contentTemplateRepository;
	@Autowired
	ContentItemRepository contentItemRepository;
	@Autowired
	ObjectMapper mapper;

	ContentTemplate	contentTemplate;
	ContentType contentType;
	
	@Before
	public void before() {
		
		ContentField cf = new ContentField();
		cf.setName("body");
		cf.setDisplayName("Body");
		cf.setRequired(true);
		cf.setFieldType(FieldType.text);
		cf.setSortOrder(0);
		
		contentTemplate = contentTemplateRepository.findByName(ContentTemplateFixture.defaultContentTemplateName);
		
		ContentType ct = new ContentType();
		ct.setName(defaultContentTypeName);
		ct.setDescription(defaultContentTypeName);
		ct.getFields().add(cf);
		ct.setUpdateable(false);
		
		cf.setContentType(ct);
		
		contentType = contentTypeRepository.save(ct);
	}
	
	@Test
	public void testContentType() throws JsonProcessingException {
		ContentType contentType = contentTypeRepository.findByName(ContentTypeFixture.defaultContentTypeName);
		ContentItem contentItem = new ContentItem();
		contentItem.setContentType(contentType);
		contentItem.setTemplate(contentTemplate);
		
		Set<ContentField> fields = contentType.getFields();
		
		for (ContentField contentField : fields) {
			contentItem.getFieldValues().put(contentField, "test");
		}
		
		String json = mapper.writeValueAsString(contentItem);
		log.info(json);
		
	}

	@Configuration
	@SpringBootApplication
	@EnableJpaRepositories(basePackages="net.savantly.sprout.core.content")
	@EntityScan(basePackages="net.savantly.sprout.core.content")
	static class configuration {

		@Bean
		public ContentTemplateFixture contentTemplateFixture(ContentTemplateRepository templateRepository) {
			return new ContentTemplateFixture(templateRepository);
		}
		
		@Bean
		public ContentTypeFixture getContentTypeFixture(ContentTypeRepository repository) {
			return new ContentTypeFixture(repository);
		}

	}
}
