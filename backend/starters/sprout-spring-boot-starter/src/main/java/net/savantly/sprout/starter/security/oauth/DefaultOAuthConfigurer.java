package net.savantly.sprout.starter.security.oauth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class DefaultOAuthConfigurer implements OAuthConfigurer {
	
	private static final Logger log = LoggerFactory.getLogger(DefaultOAuthConfigurer.class);
	public static final int PRIORITY = 10;
	
	private final OAuth2UserService<OAuth2UserRequest, OAuth2User> oauthUserService;
	private final OidcUserService oidcUserService;
	
	public DefaultOAuthConfigurer(OAuth2UserService<OAuth2UserRequest, OAuth2User> oauthUserService, OidcUserService oidcUserService) {
		this.oauthUserService = oauthUserService;
		this.oidcUserService = oidcUserService;
	}
	
	@Override
	public int getPriority() {
		return PRIORITY;
	}

	@Override
	public void configure(HttpSecurity http) {
		try {
			http.oauth2Login().loginPage("/login").userInfoEndpoint().userService(oauthUserService).oidcUserService(oidcUserService);
		} catch (Exception e) {
			log.error("", e);
			throw new OAuthConfigurationException(e.getLocalizedMessage());
		}
	}

}
