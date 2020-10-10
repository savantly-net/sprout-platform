package net.savantly.sprout.starter.security.jwt;

import org.springframework.security.core.Authentication;

public interface TokenProvider {

	String createToken(Authentication authentication, boolean rememberMe);
	Authentication getAuthentication(String token);
	boolean validateToken(String authToken);
}
