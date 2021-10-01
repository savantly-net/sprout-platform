package net.savantly.sprout.domain.home;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(value = "defaultHomePageConfiguration")
public class HomePageConfiguration {

	@Bean
	@ConditionalOnMissingBean
	public HomePageApi defaultHomePageApi() {
		return new DefaultHomePageApi();
	}
}
