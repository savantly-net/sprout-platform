package net.savantly.sprout.core.content.webPage;

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

import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutFixture;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutRepository;

@RunWith(SpringRunner.class)
@ContextConfiguration
@Transactional
public class WebPageTest {

	@Autowired
	WebPageRepository repository;
	@Autowired
	WebPageLayoutFixture wplFixture;
	@Autowired
	WebPageFixture wpFixture;
	
	@Before
	public void before() {
		wplFixture.install();
		wpFixture.install();
	}
	
	@Test
	public void testRepository() {
		WebPage page = new WebPage();
		page.setName("test");
		page.setWebPageLayout(wplFixture.getRandomEntity());
		repository.save(page);
	}
	
	@Test
	public void testFixture() {
		WebPage webPage = repository.findOneByName(WebPageFixture.DEFAULT_WEB_PAGE_NAME);
		Assert.assertNotNull("Should not be null", webPage);
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

	}
}
