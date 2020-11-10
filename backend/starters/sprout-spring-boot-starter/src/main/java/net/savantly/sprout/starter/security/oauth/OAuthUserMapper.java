package net.savantly.sprout.starter.security.oauth;

import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.user.OAuth2User;

public interface OAuthUserMapper {

	SproutOAuthUser mapUser(OAuth2User user, OAuth2AuthorizedClient client);

}
