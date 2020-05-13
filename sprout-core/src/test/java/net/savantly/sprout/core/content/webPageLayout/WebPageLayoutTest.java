package net.savantly.sprout.core.content.webPageLayout;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import net.savantly.sprout.core.DataIntegrationTest;

@DataIntegrationTest
public class WebPageLayoutTest {

	@Autowired
	WebPageLayoutRepository repository;
	@Autowired
	WebPageLayoutFixture fixture;
	
	@BeforeEach
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
		Assertions.assertNotNull(webPageLayout, "WebPageLayout should exist");
	}
	
	@TestConfiguration
	static class configuration {
		
		@Bean
		public WebPageLayoutFixture webPageLayoutFixture(WebPageLayoutRepository repository) {
			return new WebPageLayoutFixture(repository);
		}
	}
}
