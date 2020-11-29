package net.savantly.sprout.starter.security.basic;

import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.users.SproutUserService;
import net.savantly.sprout.starter.SproutWebSecurityConfiguration;
import net.savantly.sprout.starter.security.permissions.PermissionsFixture;

@Configuration(BasicAuthAutoConfiguration.BEAN_NAME)
@AutoConfigureBefore(SproutWebSecurityConfiguration.class)
public class BasicAuthAutoConfiguration {
	public static final String BEAN_NAME = "basicAuthAutoConfiguration";

	@Bean
	@ConditionalOnProperty(prefix = "sprout.security.authentication.basic", name = "enable", matchIfMissing = true)
	public BasicAuthConfigurer basicAuthConfigurer() {
		return new DefaultBasicAuthConfigurer();
	}

	@Bean
	public BasicAuthFixture basicAuthFixture(SproutConfigurationProperties props, UserRepository repository,
			SproutUserService userService, PermissionsFixture roles) {
		return new BasicAuthFixture(props, repository, userService, roles);
	}
}
