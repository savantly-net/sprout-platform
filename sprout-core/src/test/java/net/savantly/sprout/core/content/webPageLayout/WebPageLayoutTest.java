package net.savantly.sprout.core.content.webPageLayout;

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
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import net.savantly.sprout.core.content.webPageLayout.WebPageLayout;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutFixture;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutRepository;

@RunWith(SpringRunner.class)
@ContextConfiguration
@Transactional
@TestPropertySource("classpath:application.properties")
public class WebPageLayoutTest {

	@Autowired
	WebPageLayoutRepository repository;
	@Autowired
	WebPageLayoutFixture fixture;
	
	@Before
	public void before() {
		fixture.install();
	}
	
	@Test
	public void testRepository() {
		WebPageLayout webPageLayout = new WebPageLayout();
		webPageLayout.setName("Test Layout");
		webPageLayout.setDescription("a simple test");
		webPageLayout.getPlaceHolders().add("#{left-side}");
		webPageLayout.getPlaceHolders().add("#{center}");
		webPageLayout.getPlaceHolders().add("#{right-side}");
		webPageLayout.setTemplate("<div fxLayout fxFlexFill><div>#{left-side}</div><div fxFlex>#{center}</div><div>#{right-side}</div></div>");
		
		repository.save(webPageLayout);
	}
	
	@Test
	public void testFixture() {
		WebPageLayout webPageLayout = repository.findOneByName(WebPageLayoutFixture.defaultWebPageLayoutName);
		Assert.assertNotNull("WebPageLayout should exist", webPageLayout);
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

	}
}
