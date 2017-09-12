package net.savantly.sprout.autoconfigure;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
@ConditionalOnMissingBean(RepositoryRestConfigurer.class)
public class SproutRepositoryRestAutoConfiguration {

	@Configuration
	static class SproutRepositoryRestConfigurer extends RepositoryRestConfigurerAdapter {

		@Override
		public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
			config.setBasePath("/api");
		}
	}

}
