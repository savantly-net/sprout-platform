package net.savantly.sprout.domain.uiProperties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UIPropertiesConfiguration {

	@Bean 
	public UIPropertyFixture uiPropertyFixtureFixture(UIPropertyRepository repository) {
		return new UIPropertyFixture(repository);
	}
	
	@Bean
	public UIPropertyService defaultUIPropertyService(UIPropertyRepository repository) {
		return new UIPropertyService(repository);
	}
	
	@Bean
	public UIPropertiesAPI defaultUIPropertiesApi() {
		return new UIPropertiesAPI();
	}
}
