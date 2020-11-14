package net.savantly.sprout.starter.security.oauth;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.security.oauth2.client.ClientsConfiguredCondition;
import org.springframework.boot.autoconfigure.security.oauth2.client.servlet.OAuth2ClientAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.core.user.OAuth2User;

import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.starter.SproutWebSecurityConfiguration;
import net.savantly.sprout.starter.security.SecurityCustomizer;

@Configuration(OAuthAutoConfiguration.BEAN_NAME)
@Conditional(ClientsConfiguredCondition.class)
@AutoConfigureAfter(OAuth2ClientAutoConfiguration.class)
@AutoConfigureBefore(SproutWebSecurityConfiguration.class)
public class OAuthAutoConfiguration {
	public static final String BEAN_NAME = "oAuthAutoConfiguration";
	
	@Bean(name = "oauthUserMapper")
	@ConditionalOnMissingBean(DefaultOAuthUserMapper.class)
	public OAuthUserMapper oauthUserMapper(UserRepository repository) {
		return new DefaultOAuthUserMapper(repository);
	}
	
	@Bean(name = "oauthConfigurer")
	@ConditionalOnMissingBean(OAuthConfigurer.class)
	public SecurityCustomizer oauthConfigurer() {
		return new DefaultOAuthConfigurer();
	}
	
	@Bean(name = "oauth2UserService")
	@ConditionalOnMissingBean(OAuth2UserService.class)
	public OAuth2UserService<OAuth2UserRequest, SproutOAuthUser> oauth2UserService(ClientRegistrationRepository clients, OAuth2AuthorizedClientRepository authz, OAuthUserMapper userMapper) {
		
	    DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();
	    return request -> {
	    	OAuth2User user = delegate.loadUser(request);
	        OAuth2AuthorizedClient client = new OAuth2AuthorizedClient
	                (request.getClientRegistration(), user.getName(), request.getAccessToken());
	        return userMapper.mapUser(user, client);
	    };
	}
}
