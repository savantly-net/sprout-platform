package net.savantly.sprout.module.content.model.contentType;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.web.WebAppConfiguration;

import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplateFixture;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplateRepository;

@SpringBootTest
@WebAppConfiguration
@Transactional
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


	@Configuration
	@EnableAutoConfiguration
	static class TestContext {}
}
