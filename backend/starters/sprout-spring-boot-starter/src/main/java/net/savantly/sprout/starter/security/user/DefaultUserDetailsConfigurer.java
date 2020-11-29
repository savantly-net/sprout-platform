package net.savantly.sprout.starter.security.user;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import net.savantly.sprout.core.security.users.SproutUserService;
import net.savantly.sprout.starter.security.SecurityCustomizer;

public class DefaultUserDetailsConfigurer implements SecurityCustomizer {
	
	private SproutUserService userService;
	
	public DefaultUserDetailsConfigurer(SproutUserService userService) {
		this.userService = userService;
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.userDetailsService(userService);
	}

}
