package net.savantly.sprout.core.content.contentType;

import javax.transaction.Transactional;

import org.junit.Assert;
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

import net.savantly.sprout.core.content.contentTemplate.ContentTemplate;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateFixture;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateRepository;

@RunWith(SpringRunner.class)
@ContextConfiguration
@Transactional
public class ContentTypeTest {
	
	@Autowired
	ContentTypeRepository repository;
	@Autowired
	ContentTypeFixture contentTypeFixture;
	@Autowired
	ContentTemplateFixture templateFixture;
	
	@Before
	public void before() {
		templateFixture.install();
		contentTypeFixture.install();
	}
	
	@Test
	public void testContentType() {
		ContentTemplate template = new ContentTemplate();
		template.setContent("${body}");
		
		ContentType contentType = new ContentType();
		contentType.setName("test");
		contentType.setTemplate(template);
		
		// +1
		ContentType saved = repository.save(contentType);
		int expectedSize = 1 + contentTypeFixture.getEntityList().size();
		
		Assert.assertEquals("content name should match", saved.getName(), contentType.getName());
		Assert.assertEquals("total count should be 1 + the fixture count", expectedSize, repository.count());
	}

	@Configuration
	@SpringBootApplication
	@EnableJpaRepositories(basePackages="net.savantly.sprout.core.content")
	@EntityScan(basePackages="net.savantly.sprout.core.content")
	static class configuration {

		@Bean
		public ContentTemplateFixture contentTemplateFixture(ContentTemplateRepository templateRepository) {
			return new ContentTemplateFixture(templateRepository);
		}
		
		@Bean
		public ContentTypeFixture getContentTypeFixture(ContentTypeRepository repository, ContentTemplateFixture contentTemplateFixture, ContentTemplateRepository cTemplateRepository) {
			return new ContentTypeFixture(repository, contentTemplateFixture, cTemplateRepository);
		}

	}
}
