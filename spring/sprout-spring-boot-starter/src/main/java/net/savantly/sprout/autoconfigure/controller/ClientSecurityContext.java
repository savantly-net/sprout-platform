package net.savantly.sprout.autoconfigure.controller;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public class ClientSecurityContext {

	private boolean anonymous;
	private boolean authenticated;
	private boolean fullyAuthenticated;
	private Object principal;
	private boolean rememberMe;
	private Collection<? extends GrantedAuthority> authorities;

	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public Object getPrincipal() {
		return principal;
	}

	public boolean isAnonymous() {
		return anonymous;
	}

	public boolean isAuthenticated() {
		return authenticated;
	}

	public boolean isFullyAuthenticated() {
		return fullyAuthenticated;
	}

	public boolean isRememberMe() {
		return rememberMe;
	}

	public void setAnonymous(boolean anonymous) {
		this.anonymous = anonymous;
	}

	public void setAuthenticated(boolean authenticated) {
		this.authenticated = authenticated;
	}

	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	public void setFullyAuthenticated(boolean fullyAuthenticated) {
		this.fullyAuthenticated = fullyAuthenticated;
	}

	public void setPrincipal(Object principal) {
		this.principal = principal;
	}

	public void setRememberMe(boolean rememberMe) {
		this.rememberMe = rememberMe;
	}

	

}