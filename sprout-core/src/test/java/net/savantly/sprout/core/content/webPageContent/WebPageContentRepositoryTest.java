package net.savantly.sprout.core.content.webPageContent;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.content.contentField.ContentFieldRepository;
import net.savantly.sprout.core.content.contentItem.ContentItem;
import net.savantly.sprout.core.content.contentItem.ContentItemRepository;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateFixture;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateRepository;
import net.savantly.sprout.core.content.contentType.ContentTypeFixture;
import net.savantly.sprout.core.content.contentType.ContentTypeRepository;
import net.savantly.sprout.core.content.fieldType.FieldType;
import net.savantly.sprout.core.content.webPage.WebPage;
import net.savantly.sprout.core.content.webPage.WebPageFixture;
import net.savantly.sprout.core.content.webPage.WebPageRepository;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutFixture;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutRepository;

@RunWith(SpringRunner.class)
@ContextConfiguration
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
	
	ContentItem item = new ContentItem();
	
	@Before
	public void before() {
		wpLayoutFixture.install();
		wpFixture.install();
		contentTemplateFixture.install();
		contentTypeFixture.install();
		
		ContentField cf = new ContentField();
		cf.setName("test");
		cf.setFieldType(FieldType.text);
		
		ContentField cfSaved = cfRepository.save(cf);
		
		item.setContentType(contentTypeFixture.getRandomEntity());
		item.setTemplate(contentTemplateFixture.getRandomEntity());
		
		Map<ContentField, String> fieldValues = new HashMap<>();
		fieldValues.put(cfSaved, "test");
		item.setFieldValues(fieldValues );
		
		ciRepository.save(item);
	}
	
	@Test
	public void testRepository() {
		WebPage page = new WebPage();
		page.setName("test");
		page.setWebPageLayout(wpLayoutFixture.getRandomEntity());
		webPageRepository.save(page);
		WebPageContent webPageContent = new WebPageContent();
		
		List<ContentItem> cItems = new ArrayList<>();
		cItems.add(item);
		
		webPageContent.setContentItems(cItems );
		webPageContent.setWebPage(page);
		wpContentRepository.save(webPageContent );
	}
	

	@Configuration
	@SpringBootApplication
	@EnableJpaRepositories(basePackages= {"net.savantly.sprout.core.content"})
	@EntityScan(basePackages="net.savantly.sprout.core.content")
	static class configuration {
		
		@Bean
		public WebPageLayoutFixture webPageLayoutFixture(WebPageLayoutRepository repository) {
			return new WebPageLayoutFixture(repository);
		}
		
		@Bean
		public WebPageFixture webPageFixture(
				WebPageRepository wpRepository, 
				WebPageLayoutRepository wplRepository, 
				WebPageLayoutFixture wplFixture) {
			return new WebPageFixture(wpRepository, wplRepository, wplFixture);
		}
		
		@Bean
		public ContentTemplateFixture contentTemplateFixture(ContentTemplateRepository templateRepository) {
			return new ContentTemplateFixture(templateRepository);
		}
		
		@Bean
		public ContentTypeFixture getContentTypeFixture(ContentTypeRepository repository) {
			return new ContentTypeFixture(repository);
		}

	}
}
