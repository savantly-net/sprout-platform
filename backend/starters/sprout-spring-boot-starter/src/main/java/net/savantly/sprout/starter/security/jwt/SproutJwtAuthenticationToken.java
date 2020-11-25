package net.savantly.sprout.starter.security.jwt;

import java.util.Collection;

import javax.security.auth.Subject;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import net.savantly.sprout.core.security.SproutUserService;

public class SproutJwtAuthenticationToken extends AbstractAuthenticationToken {
	
	private final JwtAuthenticationToken token;
	private final SproutUserService users;
	
	public SproutJwtAuthenticationToken(JwtAuthenticationToken token, SproutUserService users) {
		super(token.getAuthorities());
		this.users = users;
		this.token = token;
	}

	@Override
	public Collection<GrantedAuthority> getAuthorities() {
		return token.getAuthorities();
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
		return token.getToken().getClaim("email");
	}
	
	@Override
	public boolean implies(Subject subject) {
		return token.implies(subject);
	}
	
	@Override
	public boolean isAuthenticated() {
		return token.isAuthenticated();
	}
	
	@Override
	public Object getCredentials() {
		return token.getCredentials();
	}

	@Override
	public Object getPrincipal() {
		if (users.usernameExists(token.getToken().getClaim("email"))) {
			return users.loadUserByUsername(token.getToken().getClaim("email"));
		} else {
			return new SproutJwtUser(token);
		}
	}
}