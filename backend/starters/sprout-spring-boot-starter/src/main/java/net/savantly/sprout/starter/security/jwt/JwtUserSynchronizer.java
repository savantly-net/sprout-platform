package net.savantly.sprout.starter.security.jwt;import net.savantly.sprout.core.domain.user.SproutUser;

public interface JwtUserSynchronizer {

	void syncUser(SproutUser user);
}
