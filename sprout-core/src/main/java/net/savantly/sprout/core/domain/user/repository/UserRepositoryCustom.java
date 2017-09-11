package net.savantly.sprout.core.domain.user.repository;

import java.util.Collection;
import java.util.Set;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.oauth.OAuthAccount;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.security.roles.Role;

public interface UserRepositoryCustom {
	SproutUser insert(SproutUser sproutUser);

	SproutUser insert(String username, String clearTextPassword, String firstName, String lastName);

	SproutUser insert(String username, String clearTextPassword, String firstName, String lastName,
			Set<Role> authorities);

	SproutUser insert(String firstName, String lastName, EmailAddress emailAddress);

	SproutUser getOrInsertForOAuth(String firstName, String lastName, OAuthAccount oAuthAccount,
			Collection<EmailAddress> emailAddress);

	SproutUser insert(String firstName, String lastName, OAuthAccount oauthAccount,
			Collection<EmailAddress> emailAddresses);

	SproutUser updateMyProfile(SproutUser myAccount);
}