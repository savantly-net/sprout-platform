package net.savantly.sprout.starter.security.session;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.web.util.UriComponentsBuilder;

import net.savantly.sprout.starter.SproutWebSecurityConfiguration;

public class LoginWithTargetUrlAuthenticationEntryPoint extends LoginUrlAuthenticationEntryPoint {
	private final Logger log = LoggerFactory.getLogger(LoginWithTargetUrlAuthenticationEntryPoint.class);

	  public LoginWithTargetUrlAuthenticationEntryPoint() {
	    super(SproutWebSecurityConfiguration.LOGIN_FORM_URL);
	  }

	  @Override
	  protected String determineUrlToUseForThisRequest(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) {
		String  withTargetParam = UriComponentsBuilder.fromUriString(super.determineUrlToUseForThisRequest(request, response, exception))
	      .queryParam(SproutWebSecurityConfiguration.TARGET_AFTER_SUCCESSFUL_LOGIN_PARAM, request.getRequestURI())
	      .toUriString();
		log.debug("entrypoint url {}", withTargetParam);
		return withTargetParam;
	  }
	}