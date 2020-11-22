package net.savantly.sprout.starter.security.authorization;

import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.starter.SproutWebSecurityConfiguration;
import net.savantly.sprout.starter.security.SecurityCustomizer;

@Configuration(AuthorizationAutoConfiguration.BEAN_NAME)
@AutoConfigureBefore(SproutWebSecurityConfiguration.class)
@ConditionalOnMissingBean(name = AuthorizationAutoConfiguration.BEAN_NAME )
public class AuthorizationAutoConfiguration {
	public static final String BEAN_NAME = "authorizationAuthAutoConfiguration";

	@Bean
	@ConditionalOnMissingBean(name = {"authorizationConfigurer"})
	public SecurityCustomizer authorizationConfigurer(SproutConfigurationProperties configProps) {
		return new DefaultAuthorizationConfigurer(configProps);
	}
}
