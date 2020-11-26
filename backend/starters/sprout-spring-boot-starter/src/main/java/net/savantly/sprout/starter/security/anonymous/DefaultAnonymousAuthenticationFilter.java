package net.savantly.sprout.starter.security.anonymous;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationDetailsSource;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.security.SproutUserService;

public class DefaultAnonymousAuthenticationFilter extends AnonymousAuthenticationFilter {
	private static final String key = "SproutAnonymousAuthenticationFilter";
	private final SproutUserService userService;

	private AuthenticationDetailsSource<HttpServletRequest, ?> authenticationDetailsSource = new WebAuthenticationDetailsSource();

	public DefaultAnonymousAuthenticationFilter(SproutUserService userService) {
		super(key);
		this.userService = userService;
	}
	
	@Override
	protected Authentication createAuthentication(HttpServletRequest request) {
		SproutUser user = null;
		if(userService.usernameExists(AnonymousAuthAutoConfiguration.ANONYMOUS_USER)) {
			user = this.userService.loadUserByUsername(AnonymousAuthAutoConfiguration.ANONYMOUS_USER);
		} else {
			user = SproutUser.anonymousUser();
		}
		AnonymousAuthenticationToken auth = new AnonymousAuthenticationToken(key,
				user, user.getAuthorities());
		auth.setDetails(this.authenticationDetailsSource.buildDetails(request));
		return auth;
	}

}
