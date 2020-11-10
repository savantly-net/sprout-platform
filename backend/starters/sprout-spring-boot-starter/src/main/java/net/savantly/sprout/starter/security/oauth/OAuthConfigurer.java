package net.savantly.sprout.starter.security.oauth;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

public interface OAuthConfigurer {
	
	void configure(HttpSecurity http);

}
