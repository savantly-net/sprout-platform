package net.savantly.sprout.module.content.model.webPageContent;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.web.WebAppConfiguration;

import net.savantly.sprout.module.content.model.contentField.ContentFieldImpl;
import net.savantly.sprout.module.content.model.contentField.ContentFieldRepository;
import net.savantly.sprout.module.content.model.contentItem.ContentItemImpl;
import net.savantly.sprout.module.content.model.contentItem.ContentItemRepository;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplateFixture;
import net.savantly.sprout.module.content.model.contentType.ContentTypeFixture;
import net.savantly.sprout.module.content.model.fieldType.FieldType;
import net.savantly.sprout.module.content.model.webPage.WebPage;
import net.savantly.sprout.module.content.model.webPage.WebPageFixture;
import net.savantly.sprout.module.content.model.webPage.WebPageRepository;
import net.savantly.sprout.module.content.model.webPageLayout.WebPageLayoutFixture;

@SpringBootTest
@WebAppConfiguration
@Transactional
public class WebPageContentRepositoryTest {

	@Autowired
	WebPageRepository webPageRepository;
	@Autowired
	WebPageLayoutFixture wpLayoutFixture;
	@Autowired
	WebPageFixture wpFixture;
	@Autowired
	WebPageContentRepository wpContentRepository;
	@Autowired
	ContentTemplateFixture contentTemplateFixture;
	@Autowired
	ContentTypeFixture contentTypeFixture;
	@Autowired
	ContentItemRepository ciRepository;
	@Autowired
	ContentFieldRepository cfRepository;
	
	ContentItemImpl item = new ContentItemImpl();
	
	@BeforeEach
	public void before() {
		wpLayoutFixture.install();
		wpFixture.install();
		contentTemplateFixture.install();
		contentTypeFixture.install();
		
		ContentFieldImpl cf = new ContentFieldImpl();
		cf.setName("test");
		cf.setFieldType(FieldType.TEXT);
		
		ContentFieldImpl cfSaved = cfRepository.save(cf);
		
		item.setContentType(contentTypeFixture.getRandomEntity());
		item.setTemplate(contentTemplateFixture.getRandomEntity());
		
		Map<String, String> fieldValues = new HashMap<>();
		fieldValues.put(cfSaved.getId(), "test");
		item.setFieldValues(fieldValues);
		
		ciRepository.save(item);
	}
	
	@Test
	public void testRepository() {
		WebPage page = new WebPage();
		page.setName("test");
		page.setWebPageLayout(wpLayoutFixture.getRandomEntity());
		webPageRepository.save(page);
		WebPageContent webPageContent = new WebPageContent();
		
		List<ContentItemImpl> cItems = new ArrayList<>();
		cItems.add(item);
		
		webPageContent.setContentItems(cItems );
		webPageContent.setWebPage(page);
		wpContentRepository.save(webPageContent );
	}
	

	@Configuration
	@EnableAutoConfiguration
	static class TestContext {}
}
