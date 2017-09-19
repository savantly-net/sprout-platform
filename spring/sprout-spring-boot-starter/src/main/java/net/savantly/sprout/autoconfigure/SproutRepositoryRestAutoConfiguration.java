package net.savantly.sprout.autoconfigure;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.user.SproutUserEntity;
import net.savantly.sprout.core.security.roles.Role;

@Configuration
@EnableJpaRepositories(basePackages="net.savantly.sprout.**")
@EntityScan(basePackages="net.savantly.**")
public class SproutRepositoryRestAutoConfiguration {

	@Configuration
	static class SproutRepositoryRestConfigurer extends RepositoryRestConfigurerAdapter {

		@Override
		public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
			config.setBasePath("/api");
			config.exposeIdsFor(Role.class, EmailAddress.class, SproutUserEntity.class);
		}
	}

}
