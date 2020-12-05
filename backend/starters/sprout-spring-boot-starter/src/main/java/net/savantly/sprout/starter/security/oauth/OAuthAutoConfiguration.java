package net.savantly.sprout.starter.security.oauth;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.security.oauth2.client.ClientsConfiguredCondition;
import org.springframework.boot.autoconfigure.security.oauth2.client.servlet.OAuth2ClientAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;

import net.savantly.sprout.core.security.users.SproutUserService;
import net.savantly.sprout.starter.SproutWebSecurityConfiguration;
import net.savantly.sprout.starter.security.SecurityCustomizer;

@Configuration(OAuthAutoConfiguration.BEAN_NAME)
@Conditional(ClientsConfiguredCondition.class)
@AutoConfigureAfter(OAuth2ClientAutoConfiguration.class)
@AutoConfigureBefore(SproutWebSecurityConfiguration.class)
public class OAuthAutoConfiguration {
	public static final String BEAN_NAME = "oAuthAutoConfiguration";
	
	@Bean(name = "oAuth2UserSynchronizer")
	@ConditionalOnMissingBean(value = {OAuth2UserSynchronizer.class}, name = {"oAuth2UserSynchronizer"})
	public OAuth2UserSynchronizer oAuth2UserSynchronizer(SproutUserService userService) {
		return new DefaultOAuth2UserSynchronizer(userService);
	}

	@Bean(name = "oauthUserMapper")
	@ConditionalOnMissingBean(OAuthUserMapper.class)
	public OAuthUserMapper oauthUserMapper(OAuth2UserSynchronizer synchronizer) {
		return new DefaultOAuthUserMapper(synchronizer);
	}

	@Bean(name = "oauthConfigurer")
	@ConditionalOnMissingBean(OAuthConfigurer.class)
	public SecurityCustomizer oauthConfigurer(@Qualifier("oauth2UserService") OAuth2UserService userService,
			@Qualifier("oidcUserService") OidcUserService oidcUserService) {
		oidcUserService.setOauth2UserService(userService);
		return new DefaultOAuthConfigurer(userService, oidcUserService);
	}

	@Bean(name = "oauth2UserService")
	@ConditionalOnMissingBean(OAuth2UserService.class)
	public OAuth2UserService oauth2UserService(OAuth2AuthorizedClientRepository authz, OAuthUserMapper userMapper) {

		return new DefaultSproutOAuth2UserService(userMapper);
	}

	@Bean(name = "oidcUserService")
	@ConditionalOnMissingBean(OidcUserService.class)
	public OidcUserService oidcUserService(SproutUserService userService) {
		return new DefaultSproutOidcUserService(userService);
	}
}
