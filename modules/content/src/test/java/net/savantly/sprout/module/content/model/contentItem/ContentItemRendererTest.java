package net.savantly.sprout.module.content.model.contentItem;

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
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.web.WebAppConfiguration;

import net.savantly.spring.fixture.Fixture;
import net.savantly.sprout.module.content.SproutContentModule;
import net.savantly.sprout.module.content.model.contentField.ContentField;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplateImpl;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplate;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplateFixture;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplateRepository;
import net.savantly.sprout.module.content.model.contentType.ContentTypeImpl;
import net.savantly.sprout.module.content.model.contentType.ContentTypeFixture;
import net.savantly.sprout.module.content.model.contentType.ContentTypeRepository;
import net.savantly.sprout.modules.test.ModuleTestApplication;

@SpringBootTest
@WebAppConfiguration
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
	private Fixture<ContentTypeImpl> contentTypeFixture;
	@Autowired
	@Qualifier("contentTemplateFixture")
	private Fixture<ContentTemplateImpl> templateFixture;
	
	ContentTemplate	contentTemplate;
	
	@BeforeEach
	public void before() {
		templateFixture.install();
		contentTypeFixture.install();
		contentTemplate = templateRepository.findByName(ContentTemplateFixture.defaultContentTemplateName);
	}
	
	
	@Test
	public void testBogusRenderer() {
		
		ContentTypeImpl contentType = ctRepository.findByName(ContentTypeFixture.defaultContentTypeName);
		ContentItemImpl contentItem = new ContentItemImpl();
		contentItem.setContentType(contentType);
		contentItem.setTemplate(contentTemplate);
		
		Set<ContentField> fields = contentType.getFields();
		
		for (ContentField contentField : fields) {
			contentItem.getFieldValues().put(contentField.getId(), "test");
		}
	
		StringWriter writer = new StringWriter();
		renderer.renderContentItem(contentItem, writer);
		Assertions.assertEquals(BOGUS, writer.toString());
	}
	
	@Test
	public void testPickyRenderer() {
		
		ContentTypeImpl contentType = new ContentTypeImpl();
		contentType.setId(PICKY);
		contentType.setName(PICKY);
		
		ContentItemImpl contentItem = new ContentItemImpl();
		contentItem.setContentType(contentType);
		contentItem.setTemplate(contentTemplate);
		
		Set<ContentField> fields = contentType.getFields();
		
		for (ContentField contentField : fields) {
			contentItem.getFieldValues().put(contentField.getId(), "test");
		}
	
		StringWriter writer = new StringWriter();
		renderer.renderContentItem(contentItem, writer);
		Assertions.assertEquals(PICKY, writer.toString());
	}
	
	@Configuration
	@Import({SproutContentModule.class, ModuleTestApplication.class})
	static class TestContext {
		
		@Bean
		public ContentItemRenderer bogusRenderer() {
			return new ContentItemRenderer() {
				
				@Override
				public boolean render(ContentItemImpl item, StringWriter writer) {
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
				public boolean render(ContentItemImpl item, StringWriter writer) {
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
				public boolean render(ContentItemImpl item, StringWriter writer) {
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
