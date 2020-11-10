package net.savantly.sprout.starter.security.oauth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import net.savantly.sprout.starter.security.SecurityCustomizer;

public class DefaultOAuthConfigurer implements OAuthConfigurer, SecurityCustomizer {
	
	private static final Logger log = LoggerFactory.getLogger(DefaultOAuthConfigurer.class);
	public static final int PRIORITY = 10;
	
	@Override
	public int getPriority() {
		return PRIORITY;
	}

	@Override
	public void configure(HttpSecurity http) {
		try {
			http.oauth2Login();
		} catch (Exception e) {
			log.error("", e);
			throw new OAuthConfigurationException(e.getLocalizedMessage());
		}
	}

}
