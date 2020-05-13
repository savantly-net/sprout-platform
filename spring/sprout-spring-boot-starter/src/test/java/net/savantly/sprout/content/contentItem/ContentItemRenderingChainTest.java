package net.savantly.sprout.content.contentItem;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Set;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import freemarker.core.ParseException;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;
import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.content.contentItem.ContentItem;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplate;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateFixture;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateRepository;
import net.savantly.sprout.core.content.contentType.ContentType;
import net.savantly.sprout.core.content.contentType.ContentTypeFixture;
import net.savantly.sprout.core.content.contentType.ContentTypeRepository;
import net.savantly.sprout.test.IntegrationTest;

@IntegrationTest
public class ContentItemRenderingChainTest {
	
	private static final Logger log = LoggerFactory.getLogger(ContentItemRenderingChainTest.class);
	
	@Autowired
	private ContentItemRenderer renderer;
	@Autowired
	private ContentTypeRepository ctRepository;
	@Autowired
	private ContentTemplateRepository templateRepository;
	
	ContentTemplate	contentTemplate;
	
	@BeforeEach
	public void before() {
		contentTemplate = templateRepository.findByName(ContentTemplateFixture.defaultContentTemplateName);
	}
	
	
	@Test
	public void testContentItemRenderer() throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		
		ContentType contentType = ctRepository.findByName(ContentTypeFixture.defaultContentTypeName);
		ContentItem contentItem = new ContentItem();
		contentItem.setContentType(contentType);
		contentItem.setTemplate(contentTemplate);
		
		Set<ContentField> fields = contentType.getFields();
		
		for (ContentField contentField : fields) {
			contentItem.getFieldValues().put(contentField, "test");
		}
	
		StringWriter writer = new StringWriter();
		renderer.render(contentItem, writer);
		Assertions.assertEquals("test", writer.toString());
	}
	
	@TestConfiguration
	static class TestContext {

		@Bean
		public ContentTemplateFixture contentTemplateFixture(ContentTemplateRepository templateRepository) {
			return new ContentTemplateFixture(templateRepository);
		}
		
		@Bean
		public ContentTypeFixture contentTypeFixture(ContentTypeRepository repository) {
			return new ContentTypeFixture(repository);
		}

	}

}