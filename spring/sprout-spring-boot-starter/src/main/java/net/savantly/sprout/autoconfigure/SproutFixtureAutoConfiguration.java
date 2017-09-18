package net.savantly.sprout.autoconfigure;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.core.security.roles.RoleFixture;
import net.savantly.sprout.core.security.roles.RoleRepository;

@Configuration
@AutoConfigureAfter(JpaRepositoriesAutoConfiguration.class)
public class SproutFixtureAutoConfiguration {
	
	@Bean 
	public RoleFixture RoleFixture(RoleRepository repository) {
		return new RoleFixture(repository);
	}

}
