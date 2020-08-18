package net.savantly.sprout.module.content.model.contentItem;

import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.web.WebAppConfiguration;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.module.content.model.contentField.ContentField;
import net.savantly.sprout.module.content.model.contentField.ContentFieldImpl;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplate;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplateFixture;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplateRepository;
import net.savantly.sprout.module.content.model.contentType.ContentTypeFixture;
import net.savantly.sprout.module.content.model.contentType.ContentTypeImpl;
import net.savantly.sprout.module.content.model.contentType.ContentTypeRepository;
import net.savantly.sprout.module.content.model.fieldType.FieldType;

@SpringBootTest
@WebAppConfiguration
@Transactional
public class ContentItemTest {
	
	static final String defaultContentTypeName = "a content type";
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
	ContentTypeImpl contentType;
	
	@BeforeEach
	public void before() {
		
		ContentFieldImpl cf = new ContentFieldImpl();
		cf.setName("body");
		cf.setDisplayName("Body");
		cf.setRequired(true);
		cf.setFieldType(FieldType.TEXT);
		cf.setSortOrder(0);
		
		contentTemplate = contentTemplateRepository.findByName(ContentTemplateFixture.defaultContentTemplateName);
		
		ContentTypeImpl ct = new ContentTypeImpl();
		ct.setName(defaultContentTypeName);
		ct.setDescription(defaultContentTypeName);
		ct.getFields().add(cf);
		ct.setUpdateable(false);
		
		contentType = contentTypeRepository.save(ct);
	}
	
	@Test
	public void testContentType() throws JsonProcessingException {
		ContentTypeImpl contentType = contentTypeRepository.findByName(ContentTypeFixture.defaultContentTypeName);
		ContentItemImpl contentItem = new ContentItemImpl();
		contentItem.setContentType(contentType);
		contentItem.setTemplate(contentTemplate);
		
		List<ContentField> fields = contentType.getFields();
		
		for (ContentField contentField : fields) {
			contentItem.getFieldValues().put(contentField.getId(), "test");
		}
		
		String json = mapper.writeValueAsString(contentItem);
		log.info(json);
		
	}


	@Configuration
	@EnableAutoConfiguration
	static class TestContext {}
}