package net.savantly.sprout.starter.security.anonymous;

import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.starter.SproutWebSecurityConfiguration;

@Configuration(AnonymousAuthAutoConfiguration.BEAN_NAME)
@AutoConfigureBefore(SproutWebSecurityConfiguration.class)
@ConditionalOnMissingBean(name = AnonymousAuthAutoConfiguration.BEAN_NAME )
public class AnonymousAuthAutoConfiguration {
	public static final String BEAN_NAME = "anonymousAuthAutoConfiguration";

	@Bean
	@ConditionalOnProperty(prefix = "sprout.security.authentication.anonymous", name = "enable", matchIfMissing = true)
	public AnonymousAuthConfigurer defaultAnonymousAuthConfigurer(SproutConfigurationProperties configProps) {
		return new DefaultAnonymousAuthConfigurer(configProps);
	}
	
	@Bean
	@ConditionalOnProperty(prefix = "sprout.security.authentication.anonymous", name = "enable", matchIfMissing = false, havingValue = "false")
	public AnonymousAuthConfigurer disableAnonymousAuthConfigurer(SproutConfigurationProperties configProps) {
		return new AnonymousAuthConfigurer() {
			
			@Override
			public void configure(HttpSecurity http) throws Exception {
				http.anonymous().disable();
			}
		};
	}

}
