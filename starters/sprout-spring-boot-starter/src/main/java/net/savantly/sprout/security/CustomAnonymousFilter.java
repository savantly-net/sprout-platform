package net.savantly.sprout.security;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationDetailsSource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.Assert;
import org.springframework.web.filter.GenericFilterBean;

import net.savantly.sprout.core.configuration.SecurityConstants;

public class CustomAnonymousFilter extends GenericFilterBean implements InitializingBean {

	private static final String ANONYMOUS_ROLE = "ANONYMOUS";
	private UserDetailsService userDetailsService;
	private AuthenticationDetailsSource<HttpServletRequest, ?> authenticationDetailsSource = new WebAuthenticationDetailsSource();
	private String key = ANONYMOUS_ROLE;
	private String principal = SecurityConstants.ANONYMOUS_USER_ID;

	public CustomAnonymousFilter(UserDetailsService userDetailsService) {
		this.userDetailsService = userDetailsService;
	}

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {

		if (SecurityContextHolder.getContext().getAuthentication() == null) {
			SecurityContextHolder.getContext().setAuthentication(
					createAuthentication((HttpServletRequest) req));

			if (logger.isDebugEnabled()) {
				logger.debug("Populated SecurityContextHolder with anonymous token: '"
						+ SecurityContextHolder.getContext().getAuthentication() + "'");
			}
		}
		else {
			if (logger.isDebugEnabled()) {
				logger.debug("SecurityContextHolder not populated with anonymous token, as it already contained: '"
						+ SecurityContextHolder.getContext().getAuthentication() + "'");
			}
		}

		chain.doFilter(req, res);
	}

	protected Authentication createAuthentication(HttpServletRequest request) {
		AnonymousAuthenticationToken auth = new AnonymousAuthenticationToken(key,
				principal, getAuthorities());
		auth.setDetails(authenticationDetailsSource.buildDetails(request));

		return auth;
	}

	public void setAuthenticationDetailsSource(
			AuthenticationDetailsSource<HttpServletRequest, ?> authenticationDetailsSource) {
		Assert.notNull(authenticationDetailsSource,
				"AuthenticationDetailsSource required");
		this.authenticationDetailsSource = authenticationDetailsSource;
	}

	public Object getPrincipal() {
		return principal;
	}

	public List<GrantedAuthority> getAuthorities() {
		UserDetails user = this.userDetailsService.loadUserByUsername(SecurityConstants.ANONYMOUS_USER_ID);
		return user.getAuthorities().stream().collect(Collectors.toList());
	}
}