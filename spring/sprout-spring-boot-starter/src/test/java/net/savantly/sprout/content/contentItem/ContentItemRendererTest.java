package net.savantly.sprout.content.contentItem;

import java.io.StringWriter;
import java.util.Set;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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
@Transactional
public class ContentItemRendererTest {
	
	private static final Logger log = LoggerFactory.getLogger(ContentItemRendererTest.class);
	private static final String BOGUS = "BOGUS";
	private static final String PICKY = "PICKY";
	
	@Autowired
	private ContentItemRenderingChain renderer;
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
	
	@BeforeEach
	public void before() {
		templateFixture.install();
		contentTypeFixture.install();
		contentTemplate = templateRepository.findByName(ContentTemplateFixture.defaultContentTemplateName);
	}
	
	
	@Test
	public void testBogusRenderer() {
		
		ContentType contentType = ctRepository.findByName(ContentTypeFixture.defaultContentTypeName);
		ContentItem contentItem = new ContentItem();
		contentItem.setContentType(contentType);
		contentItem.setTemplate(contentTemplate);
		
		Set<ContentField> fields = contentType.getFields();
		
		for (ContentField contentField : fields) {
			contentItem.getFieldValues().put(contentField, "test");
		}
	
		StringWriter writer = new StringWriter();
		renderer.renderContentItem(contentItem, writer);
		Assertions.assertEquals(BOGUS, writer.toString());
	}
	
	@Test
	public void testPickyRenderer() {
		
		ContentType contentType = new ContentType();
		contentType.setId(PICKY);
		contentType.setName(PICKY);
		
		ContentItem contentItem = new ContentItem();
		contentItem.setContentType(contentType);
		contentItem.setTemplate(contentTemplate);
		
		Set<ContentField> fields = contentType.getFields();
		
		for (ContentField contentField : fields) {
			contentItem.getFieldValues().put(contentField, "test");
		}
	
		StringWriter writer = new StringWriter();
		renderer.renderContentItem(contentItem, writer);
		Assertions.assertEquals(PICKY, writer.toString());
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
		
		@Bean
		public ContentItemRenderer bogusRenderer() {
			return new ContentItemRenderer() {
				
				@Override
				public boolean render(ContentItem item, StringWriter writer) {
					writer.write(BOGUS);
					return true;
				}
				
				@Override
				public int getPriority() {
					return 1;
				}
			};
		}
		
		@Bean
		public ContentItemRenderer lazyRenderer() {
			return new ContentItemRenderer() {
				
				@Override
				public boolean render(ContentItem item, StringWriter writer) {
					// I dont render anyting
					return false;
				}
				
				@Override
				public int getPriority() {
					return 2;
				}
			};
		}
		
		@Bean
		public ContentItemRenderer pickyRenderer() {
			return new ContentItemRenderer() {
				
				@Override
				public boolean render(ContentItem item, StringWriter writer) {
					if (item.getContentType().getId() == PICKY) {
						writer.write(PICKY);
						return true;
					} else {
						return false;
					}
				}
				
				@Override
				public int getPriority() {
					return 2;
				}
			};
		}

	}
}
