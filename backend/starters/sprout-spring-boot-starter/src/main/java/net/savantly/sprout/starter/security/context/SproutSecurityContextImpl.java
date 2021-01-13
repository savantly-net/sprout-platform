package net.savantly.sprout.starter.security.context;

import java.util.Objects;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import net.savantly.sprout.core.domain.user.SproutUser;

public class SproutSecurityContextImpl implements SproutSecurityContext {

	@Override
	public Optional<SproutUser> getCurrentUser() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (Objects.nonNull(auth.getPrincipal()) && SproutUser.class.isAssignableFrom(auth.getPrincipal().getClass())) {
			return Optional.of((SproutUser)auth.getPrincipal());
		} else {
			return Optional.empty();
		}
	}

	@Override
	public Authentication getCurrentAuthentication() {
		return SecurityContextHolder.getContext().getAuthentication();
	}
}