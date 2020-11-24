package net.savantly.sprout.starter.security.oauth;

import org.springframework.security.oauth2.core.user.OAuth2User;

import net.savantly.sprout.core.domain.user.SproutUser;

public interface OAuth2UserSynchronizer {

	SproutUser syncUser(OAuth2User user);
}
