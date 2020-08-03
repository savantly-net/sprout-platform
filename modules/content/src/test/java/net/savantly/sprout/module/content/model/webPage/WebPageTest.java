package net.savantly.sprout.module.content.model.webPage;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.web.WebAppConfiguration;

import net.savantly.sprout.module.content.model.webPageLayout.WebPageLayoutFixture;
import net.savantly.sprout.module.content.model.webPageLayout.WebPageLayoutRepository;

@SpringBootTest
@WebAppConfiguration
public class WebPageTest {

	@Autowired
	WebPageRepository repository;
	@Autowired
	WebPageLayoutFixture wplFixture;
	@Autowired
	WebPageFixture wpFixture;
	@Autowired
	WebPageLayoutRepository wplRepository;
	
	@BeforeEach
	public void before() {
		wplFixture.install();
		wpFixture.install();
	}
	
	@Test
	public void testRepository() {
		WebPage page = new WebPage();
		page.setName("test");
		page.setWebPageLayout(this.wplRepository.findOneByName(WebPageLayoutFixture.defaultWebPageLayoutName));
		repository.save(page);
	}
	
	@Test
	public void testFixture() {
		WebPage webPage = repository.findOneByName(WebPageFixture.DEFAULT_WEB_PAGE_NAME);
		Assertions.assertNotNull(webPage, "Should not be null");
	}
	
	@Configuration
	@EnableAutoConfiguration
	static class TestContext{
		
	}
}