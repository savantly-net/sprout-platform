package net.savantly.sprout.starter.security.context;

import java.util.Optional;

import org.springframework.security.core.Authentication;

import net.savantly.sprout.core.domain.user.SproutUser;

public interface SproutSecurityContext {

	Optional<SproutUser> getCurrentUser();
	Authentication getCurrentAuthentication();
}
