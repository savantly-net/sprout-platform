package net.savantly.sprout.core.content.webPage;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import net.savantly.sprout.core.DataIntegrationTest;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutFixture;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutRepository;

@DataIntegrationTest
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
	
	
	@TestConfiguration
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

	}
}