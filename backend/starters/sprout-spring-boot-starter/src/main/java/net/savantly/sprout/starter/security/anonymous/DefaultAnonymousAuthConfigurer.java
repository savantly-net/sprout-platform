package net.savantly.sprout.starter.security.anonymous;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.security.SproutUserService;

public class DefaultAnonymousAuthConfigurer implements AnonymousAuthConfigurer {

	private final SproutConfigurationProperties configProps;
	private final SproutUserService userService;

	public DefaultAnonymousAuthConfigurer(SproutConfigurationProperties configProps, SproutUserService userService) {
		this.configProps = configProps;
		this.userService = userService;
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.anonymous().authenticationFilter(new DefaultAnonymousAuthenticationFilter(userService));
	}

}
