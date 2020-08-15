package net.savantly.sprout.module.content.model.contentItem;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import net.savantly.sprout.module.content.model.contentField.ContentField;
import net.savantly.sprout.module.content.model.contentField.ContentFieldImpl;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplate;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplateFixture;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplateRepository;
import net.savantly.sprout.module.content.model.contentType.ContentTypeImpl;
import net.savantly.sprout.module.content.model.contentType.ContentTypeRepository;
import net.savantly.sprout.module.content.model.fieldType.FieldType;

@SpringBootTest
@WebAppConfiguration
@Transactional
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
	private ContentItemImpl savedContentItem;
	
	@BeforeEach
	public void setup() {
		mvc = MockMvcBuilders
				.webAppContextSetup(ctx)
				.build();
		

		
		ContentTemplate template = cTemplateRepository.findByName(ContentTemplateFixture.defaultContentTemplateName);
		
		ContentTypeImpl ct = ctRepository.findByName(defaultContentTypeName);
		if ( ct == null) {
			ContentFieldImpl cf = new ContentFieldImpl();
			cf.setName("body");
			cf.setDisplayName("Body");
			cf.setRequired(true);
			cf.setFieldType(FieldType.text);
			cf.setSortOrder(0);
			
			ct = new ContentTypeImpl();
			ct.setName(defaultContentTypeName);
			ct.setDescription(defaultContentTypeName);
			ct.getFields().add(cf);
			ct.setUpdateable(false);
			
			ctRepository.save(ct);
		}
		
		
		
		ContentItemImpl contentItem = ciRepository.findByName(contentItemName);
		if(contentItem == null ) {
			contentItem = new ContentItemImpl();
			contentItem.setContentType(ct);
			contentItem.setName(contentItemName);
			contentItem.setTemplate(template);
			
			Set<ContentField> fields = ct.getFields();
			
			for (ContentField contentField : fields) {
				contentItem.getFieldValues().put(contentField.getId(), "test");
			}	
		}

		savedContentItem = ciRepository.save(contentItem);
	}
	
	@Test
	public void loadIndexPage() throws Exception {
		mvc.perform(get("/api/content/item/"+savedContentItem.getId()))
			.andExpect(status().isOk());
	}
	
	@Test
	public void testApiJsonResponse() throws Exception {
		ResultActions resultsActions = mvc.perform(get("/api/repo/contentItems/"+savedContentItem.getId()));
		log.info(resultsActions.toString());
		resultsActions
			.andExpect(status().isOk())
			.andExpect(MockMvcResultMatchers.jsonPath("fieldValues").isMap());
	}
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext {}
}
