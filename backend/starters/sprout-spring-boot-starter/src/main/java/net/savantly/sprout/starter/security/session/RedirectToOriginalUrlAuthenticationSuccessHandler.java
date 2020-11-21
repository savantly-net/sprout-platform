package net.savantly.sprout.starter.security.session;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.util.UrlUtils;

import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.starter.SproutWebSecurityConfiguration;

public class RedirectToOriginalUrlAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	  private static final String DEFAULT_TARGET_URL = "/";
	  private static final Logger log = LoggerFactory.getLogger(RedirectToOriginalUrlAuthenticationSuccessHandler.class);

	  public RedirectToOriginalUrlAuthenticationSuccessHandler() {
	    super(DEFAULT_TARGET_URL);
	    this.setTargetUrlParameter(SproutWebSecurityConfiguration.TARGET_AFTER_SUCCESSFUL_LOGIN_PARAM);
	  }

	  @Override
	  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		  SproutUser userInfo = (SproutUser) authentication.getPrincipal();
	    super.onAuthenticationSuccess(request, response, authentication);
	  }

	  @Override
	  protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
	    String targetUrl = super.determineTargetUrl(request, response, authentication);
	    if (UrlUtils.isAbsoluteUrl(targetUrl)) {
	      log.warn("Absolute target URL {} identified and suppressed", targetUrl);
	      return DEFAULT_TARGET_URL;
	    }
	    return targetUrl;
	  }
	}