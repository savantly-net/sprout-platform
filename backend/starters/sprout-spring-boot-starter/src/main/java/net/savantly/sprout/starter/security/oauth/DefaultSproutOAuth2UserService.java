package net.savantly.sprout.starter.security.oauth;

import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class DefaultSproutOAuth2UserService extends DefaultOAuth2UserService {
	
	private final OAuthUserMapper userMapper;

	public DefaultSproutOAuth2UserService(OAuthUserMapper userMapper) {
		this.userMapper = userMapper;
	}

	@Override
	public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
		OAuth2User user = super.loadUser(request);
		OAuth2AuthorizedClient client = new OAuth2AuthorizedClient(request.getClientRegistration(), user.getName(),
				request.getAccessToken());
		return userMapper.mapUser(user, client);
	}
}
