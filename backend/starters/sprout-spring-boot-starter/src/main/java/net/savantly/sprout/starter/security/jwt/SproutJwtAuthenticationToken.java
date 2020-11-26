package net.savantly.sprout.starter.security.jwt;

import javax.security.auth.Subject;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import net.savantly.sprout.core.domain.user.SproutUser;

public class SproutJwtAuthenticationToken extends AbstractAuthenticationToken {

	private final JwtAuthenticationToken token;
	private final SproutUser user;
	private final String name;

	public SproutJwtAuthenticationToken(JwtAuthenticationToken token, SproutUser user) {
		super(token.getAuthorities());
		this.name = user.getUsername();
		this.user = user;
		this.token = token;
		this.setAuthenticated(token.isAuthenticated());
	}

	@Override
	public void eraseCredentials() {
		token.eraseCredentials();
	}

	@Override
	public Object getDetails() {
		return token.getDetails();
	}

	@Override
	public String getName() {
		return name;
	}

	@Override
	public boolean implies(Subject subject) {
		return token.implies(subject);
	}

	@Override
	public Object getCredentials() {
		return token.getCredentials();
	}

	@Override
	public Object getPrincipal() {
		return user;
	}
}