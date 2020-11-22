package net.savantly.sprout.starter.security.anonymous;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.domain.user.SproutUser;

public class DefaultAnonymousAuthConfigurer implements AnonymousAuthConfigurer {

	private final SproutConfigurationProperties configProps;
	
	public DefaultAnonymousAuthConfigurer(SproutConfigurationProperties configProps) {
		this.configProps = configProps;
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
    	http.anonymous()
    	.principal(SproutUser.anonymousUser())
    	.authorities(configProps.getSecurity().getAuthentication().getAnonymous().getRoles().toArray(new String[0]));
	}

}
