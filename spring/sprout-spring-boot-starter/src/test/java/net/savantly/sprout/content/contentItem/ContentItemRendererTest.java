package net.savantly.sprout.content.contentItem;

import java.io.IOException;
import java.util.Set;

import javax.transaction.Transactional;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.junit4.SpringRunner;

import freemarker.core.ParseException;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;
import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.content.contentItem.ContentItem;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplate;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateFixture;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateRepository;
import net.savantly.sprout.core.content.contentType.ContentType;
import net.savantly.sprout.core.content.contentType.ContentTypeFixture;
import net.savantly.sprout.core.content.contentType.ContentTypeRepository;

@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
public class ContentItemRendererTest {
	
	private static final Logger log = LoggerFactory.getLogger(ContentItemRendererTest.class);
	
	@Autowired
	private ContentItemRenderer renderer;
	@Autowired
	private ContentTypeRepository ctRepository;
	@Autowired
	private ContentTemplateRepository templateRepository;
	@Autowired
	@Qualifier("contentTypeFixture")
	private Fixture<ContentType> contentTypeFixture;
	@Autowired
	@Qualifier("contentTemplateFixture")
	private Fixture<ContentTemplate> templateFixture;
	
	ContentTemplate	contentTemplate;
	
	@Before
	public void before() {
		templateFixture.install();
		contentTypeFixture.install();
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
	
		String text = renderer.render(contentItem);
		Assert.assertEquals("should equal", "test", text);
	}
	
	@Configuration
	@EnableAutoConfiguration
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
