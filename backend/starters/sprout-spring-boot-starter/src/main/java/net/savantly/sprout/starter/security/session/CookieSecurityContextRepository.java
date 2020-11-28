package net.savantly.sprout.starter.security.session;

import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpRequestResponseHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SaveContextOnUpdateOrErrorResponseWrapper;
import org.springframework.security.web.context.SecurityContextRepository;

import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.security.users.SproutUserService;
import net.savantly.sprout.model.user.UserDto;
import net.savantly.sprout.starter.security.anonymous.AnonymousAuthAutoConfiguration;

public class CookieSecurityContextRepository extends HttpSessionSecurityContextRepository
		implements SecurityContextRepository {

	private static final Logger log = LoggerFactory.getLogger(CookieSecurityContextRepository.class);
	private static final String EMPTY_CREDENTIALS = "";

	private final String cookieHmacKey;
	private final SproutUserService userService;

	public CookieSecurityContextRepository(String cookieHmacKey, SproutUserService userService) {
		this.cookieHmacKey = cookieHmacKey;
		this.userService = userService;
	}

	@Override
	public SecurityContext loadContext(HttpRequestResponseHolder requestResponseHolder) {
		HttpServletRequest request = requestResponseHolder.getRequest();
		HttpServletResponse response = requestResponseHolder.getResponse();
		requestResponseHolder.setResponse(new SaveToCookieResponseWrapper(request, response));

		SecurityContext context = SecurityContextHolder.createEmptyContext();
		if (hasJSessionId(request)) {
			// If there is a JSESSIONID, then the request is likely coming from the server
			// app, and not the SPA
			return super.loadContext(requestResponseHolder);
		} else if (hasBearerToken(request)) {
			// the SPA is likely requesting a session
			// let's not read the UserInfo cookie because it should be anonymous before the
			// JWT Filter completes
			// so just do nothing...
			return context;
		} else {
			try {
				readUserInfoFromCookie(request).ifPresent(userInfo -> {
					if (!userInfo.getUsername().contentEquals(AnonymousAuthAutoConfiguration.ANONYMOUS_USER)) {
						context.setAuthentication(
								new UsernamePasswordAuthenticationToken(userInfo, EMPTY_CREDENTIALS,
								userInfo.getAuthorities()));
					}
				});
			} catch (CookieVerificationFailedException e) {
				log.debug("cookie validation failed: {}", e.getMessage());
			}

			return context;
		}
	}

	private boolean hasBearerToken(HttpServletRequest request) {
		Optional<Cookie> maybe = readCookieFromRequest(request, "Authorization");
		return (maybe.isPresent() && maybe.get().getValue().contains("Bearer"));
	}

	private boolean hasJSessionId(HttpServletRequest request) {
		Optional<Cookie> maybe = readCookieFromRequest(request, "JSESSIONID");
		return maybe.isPresent();
	}

	@Override
	public void saveContext(SecurityContext context, HttpServletRequest request, HttpServletResponse response) {
		if (hasJSessionId(request)) {
			super.saveContext(context, request, response);
			return;
		} else {
			if (SaveToCookieResponseWrapper.class.isAssignableFrom(response.getClass())) {
				SaveToCookieResponseWrapper responseWrapper = (SaveToCookieResponseWrapper) response;
				if (!responseWrapper.isContextSaved()) {
					responseWrapper.saveContext(context);
				}
			} else {
				log.debug("servlet response is not wrapped, so not saving to cookie: {}", response.getClass());
			}
		}
	}

	@Override
	public boolean containsContext(HttpServletRequest request) {
		if (hasJSessionId(request)) {
			return super.containsContext(request);
		} else {
			try {
				return readUserInfoFromCookie(request).isPresent();
			} catch (CookieVerificationFailedException e) {
				return false;
			}
		}
	}

	private Optional<SproutUser> readUserInfoFromCookie(HttpServletRequest request)
			throws CookieVerificationFailedException {
		Optional<Cookie> maybeCookie = readCookieFromRequest(request, SignedUserInfoCookie.NAME);
		if (maybeCookie.isPresent()) {
			return Optional.of(createUserInfo(maybeCookie.get()));
		} else {
			return Optional.empty();
		}
	}

	private Optional<Cookie> readCookieFromRequest(HttpServletRequest request, String cookieName) {
		if (request.getCookies() == null) {
			return Optional.empty();
		}

		Optional<Cookie> maybeCookie = Stream.of(request.getCookies()).filter(c -> cookieName.equals(c.getName()))
				.findFirst();

		return maybeCookie;
	}

	private SproutUser createUserInfo(Cookie cookie) throws CookieVerificationFailedException {
		UserDto user = new SignedUserInfoCookie(cookie, cookieHmacKey).getUserInfo();
		if (userService.usernameExists(user.getName())) {
			return userService.loadUserByUsername(user.getName());
		} else {
			log.warn("did not find valid user in cookie. using anonymous as fail-safe. username in cookie: "
					+ user.getName());
			return SproutUser.anonymousUser();
		}
	}

	private class SaveToCookieResponseWrapper extends SaveContextOnUpdateOrErrorResponseWrapper {
		private final HttpServletRequest request;

		SaveToCookieResponseWrapper(HttpServletRequest request, HttpServletResponse response) {
			super(response, true);
			this.request = request;
		}

		@Override
		protected void saveContext(SecurityContext securityContext) {
			HttpServletResponse response = (HttpServletResponse) getResponse();
			Authentication authentication = securityContext.getAuthentication();

			// Let's not add a cookie for an anonymous user, otherwise we will need to handle creating an anonymous token when rehydrating the cookie
			if (Objects.nonNull(authentication)
					&& SproutUser.class.isAssignableFrom(authentication.getPrincipal().getClass())
					&& !AnonymousAuthenticationToken.class.isAssignableFrom(authentication.getClass())) {
				SproutUser userInfo = (SproutUser) authentication.getPrincipal();
				SignedUserInfoCookie cookie = new SignedUserInfoCookie(userInfo, cookieHmacKey);
				cookie.setSecure(request.isSecure());
				response.addCookie(cookie);
			}
		}
	}
}