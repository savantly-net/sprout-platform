package net.savantly.sprout.core.content.contentType;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import net.savantly.sprout.core.DataIntegrationTest;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateFixture;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateRepository;

@DataIntegrationTest
public class ContentTypeTest {
	
	@Autowired
	ContentTypeRepository repository;
	@Autowired
	ContentTypeFixture contentTypeFixture;
	@Autowired
	ContentTemplateFixture templateFixture;
	
	@BeforeEach
	public void before() {
		templateFixture.install();
		contentTypeFixture.install();
	}
	
	@Test
	public void testContentType() {
		ContentType contentType = new ContentType();
		contentType.setName("test");
		
		// +1
		ContentType saved = repository.save(contentType);
		int expectedSize = 1 + contentTypeFixture.getEntityList().size();
		
		Assertions.assertEquals(contentType.getName(), saved.getName(), "content name should match");
		Assertions.assertEquals(expectedSize, repository.count(), "total count should be 1 + the fixture count");
	}

	@TestConfiguration
	static class configuration {

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
