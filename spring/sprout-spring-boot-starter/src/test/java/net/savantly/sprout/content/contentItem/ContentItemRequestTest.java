package net.savantly.sprout.content.contentItem;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Set;

import javax.transaction.Transactional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.content.contentItem.ContentItem;
import net.savantly.sprout.core.content.contentItem.ContentItemRepository;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplate;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateFixture;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateRepository;
import net.savantly.sprout.core.content.contentType.ContentType;
import net.savantly.sprout.core.content.contentType.ContentTypeRepository;
import net.savantly.sprout.core.content.fieldType.FieldType;

@SpringBootTest
@WebAppConfiguration
@RunWith(SpringRunner.class)
public class ContentItemRequestTest {
	
	private static final Logger log = LoggerFactory.getLogger(ContentItemRequestTest.class);
	private static final String contentItemName = "testContent";
	static final String defaultContentTypeName = "Default Content Type";
	
	@Autowired
	ContentItemRenderer renderer;
	@Autowired
	ContentTypeRepository ctRepository;
	@Autowired
	ContentTemplateRepository cTemplateRepository;
	@Autowired
	ContentItemRepository ciRepository;
	@Autowired
	WebApplicationContext ctx;
	
	private MockMvc mvc;
	private ContentItem savedContentItem;
	
	@Before
	public void setup() {
		mvc = MockMvcBuilders
				.webAppContextSetup(ctx)
				.build();
		

		
		ContentTemplate template = cTemplateRepository.findByName(ContentTemplateFixture.defaultContentTemplateName);
		
		ContentType ct = ctRepository.findByName(defaultContentTypeName);
		if ( ct == null) {
			ContentField cf = new ContentField();
			cf.setName("body");
			cf.setDisplayName("Body");
			cf.setRequired(true);
			cf.setFieldType(FieldType.text);
			cf.setSortOrder(0);
			
			ct = new ContentType();
			ct.setName(defaultContentTypeName);
			ct.setDescription(defaultContentTypeName);
			ct.getFields().add(cf);
			ct.setUpdateable(false);
			
			cf.setContentType(ct);
			ctRepository.save(ct);
		}
		
		
		
		ContentItem contentItem = ciRepository.findByName(contentItemName);
		if(contentItem == null ) {
			contentItem = new ContentItem();
			contentItem.setContentType(ct);
			contentItem.setName(contentItemName);
			contentItem.setTemplate(template);
			
			Set<ContentField> fields = ct.getFields();
			
			for (ContentField contentField : fields) {
				contentItem.getFieldValues().put(contentField, "test");
			}	
		}

		savedContentItem = ciRepository.save(contentItem);
	}
	
	@Test
	public void loadIndexPage() throws Exception {
		mvc.perform(get("/rest/content/"+savedContentItem.getId()))
			.andExpect(status().isOk());
	}
	
	@Test
	public void testApiJsonResponse() throws Exception {
		ResultActions resultsActions = mvc.perform(get("/api/contentItems/"+savedContentItem.getId()));
		log.info(resultsActions.toString());
		resultsActions
			.andExpect(status().isOk())
			.andExpect(MockMvcResultMatchers.jsonPath("fieldValues").isMap());
	}
	

	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext {
/*		
		@Bean
		public ContentItemRestController restController(ContentItemRenderer renderer) {
			return new ContentItemRestController(renderer);
		}
		
		@Bean
		public ContentItemRenderer renderer(FreeMarkerConfigurer configurer, ContentTypeTemplateLoader loader) throws IOException, TemplateException {
			return new ContentItemRenderer(configurer, loader);
		}
		
		@Bean
		public ContentTypeTemplateLoader loader(ContentTemplateRepository repository) {
			return new ContentTypeTemplateLoader(repository);
		}*/

	}
}
