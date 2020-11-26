package net.savantly.sprout.starter.security.jwt;import org.springframework.security.oauth2.jwt.Jwt;

import net.savantly.sprout.core.domain.user.SproutUser;

public interface JwtUserSynchronizer {

	SproutUser syncUser(Jwt jwt);
}
