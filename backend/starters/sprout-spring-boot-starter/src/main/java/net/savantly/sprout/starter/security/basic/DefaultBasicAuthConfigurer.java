package net.savantly.sprout.starter.security.basic;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

public class DefaultBasicAuthConfigurer implements BasicAuthConfigurer {
	
	private static final Logger log = LoggerFactory.getLogger(DefaultBasicAuthConfigurer.class);
	public static final int PRIORITY = 7;
	
	@Override
	public int getPriority() {
		return PRIORITY;
	}

	@Override
	public void configure(HttpSecurity http) {
		try {
			http.httpBasic();
		} catch (Exception e) {
			log.error("", e);
			throw new BasicAuthConfigurationException(e.getLocalizedMessage());
		}
	}

}
