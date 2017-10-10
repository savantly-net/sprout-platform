package net.savantly.sprout.content.contentItem;

import java.io.IOException;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.junit4.SpringRunner;

import freemarker.core.ParseException;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;
import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.content.contentItem.ContentItem;
import net.savantly.sprout.core.content.contentType.ContentType;
import net.savantly.sprout.core.content.contentType.ContentTypeFixture;
import net.savantly.sprout.core.content.contentType.ContentTypeRepository;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ContentItemRendererTest {
	
	private static final Logger log = LoggerFactory.getLogger(ContentItemRendererTest.class);
	
	@Autowired
	ContentItemRenderer renderer;
	@Autowired
	ContentTypeRepository ctRepository;
	
	
	@Test
	public void testContentItemRenderer() throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		
		ContentType contentType = ctRepository.findByName(ContentTypeFixture.defaultContentTypeName);
		ContentItem contentItem = new ContentItem();
		contentItem.setContentType(contentType);
		
		List<ContentField> fields = contentType.getFields();
		
		for (ContentField contentField : fields) {
			contentItem.getFieldValues().put(contentField, "test");
		}
	
		String text = renderer.render(contentItem);
		Assert.assertEquals("should equal", "test", text);
	}
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext {
		
		
	}

}
