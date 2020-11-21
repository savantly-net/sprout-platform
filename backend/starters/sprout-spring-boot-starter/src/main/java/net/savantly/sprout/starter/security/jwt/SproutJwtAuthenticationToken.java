package net.savantly.sprout.starter.security.jwt;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import net.savantly.sprout.core.domain.user.SproutUser;

public class SproutJwtAuthenticationToken extends JwtAuthenticationToken {
	
	private final SproutUser principal;

	public SproutJwtAuthenticationToken(Jwt jwt, SproutUser user) {
		super(jwt);
		this.principal = user;
	}

	@Override
	public Object getPrincipal() {
		return principal;
	}
	
}
