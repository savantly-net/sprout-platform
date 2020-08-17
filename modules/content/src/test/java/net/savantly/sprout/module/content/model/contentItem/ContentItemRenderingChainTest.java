package net.savantly.sprout.module.content.model.contentItem;

import java.io.IOException;
import java.io.StringWriter;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import freemarker.core.ParseException;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;
import net.savantly.sprout.module.content.SproutContentModule;
import net.savantly.sprout.module.content.model.contentField.ContentField;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplate;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplateFixture;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplateRepository;
import net.savantly.sprout.module.content.model.contentType.ContentTypeImpl;
import net.savantly.sprout.module.content.model.contentType.ContentTypeFixture;
import net.savantly.sprout.module.content.model.contentType.ContentTypeRepository;
import net.savantly.sprout.modules.test.ModuleTestApplication;

@SpringBootTest
@Transactional
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
		
		ContentTypeImpl contentType = ctRepository.findByName(ContentTypeFixture.defaultContentTypeName);
		ContentItemImpl contentItem = new ContentItemImpl();
		contentItem.setContentType(contentType);
		contentItem.setTemplate(contentTemplate);
		
		List<ContentField> fields = contentType.getFields();
		
		for (ContentField contentField : fields) {
			contentItem.getFieldValues().put(contentField.getId(), "test");
		}
	
		StringWriter writer = new StringWriter();
		renderer.render(contentItem, writer);
		Assertions.assertEquals("test", writer.toString());
	}
	
	@Configuration
	@Import({SproutContentModule.class, ModuleTestApplication.class})
	static class TestContext{
		
	}

}