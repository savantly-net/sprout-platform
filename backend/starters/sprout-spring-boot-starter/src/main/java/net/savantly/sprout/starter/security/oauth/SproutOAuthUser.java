package net.savantly.sprout.starter.security.oauth;

import org.springframework.security.oauth2.core.user.OAuth2User;

import net.savantly.sprout.core.domain.user.SproutUser;

public interface SproutOAuthUser extends SproutUser, OAuth2User {

}
