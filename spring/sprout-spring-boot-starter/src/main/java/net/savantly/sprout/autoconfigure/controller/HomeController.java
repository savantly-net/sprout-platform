package net.savantly.sprout.autoconfigure.controller;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.security.authentication.AuthenticationTrustResolverImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.expression.WebSecurityExpressionRoot;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.databind.ObjectMapper;

@Controller(HomeController.BEAN_NAME)
public class HomeController {
	protected static final String BEAN_NAME = "sproutBootHomeController";
	static final Logger log = LoggerFactory.getLogger(HomeController.class);

	@Autowired
	ObjectMapper objectMapper;
	@Autowired
	private SproutControllerConfiguration controllerConfig;
	@Value("${info.app.buildNumber:0}")
	private String buildNumber;
	@Value("${spring.application.name:Sprout}")
	private String appName;

	@RequestMapping({ "/" })
	public String index(Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		// Client Settings
		Map<String, Object> clientConfig = new HashMap<>();
		clientConfig.put("settings", controllerConfig.getConfig());
		clientConfig.put("appName", appName);
		clientConfig.put("footerText", controllerConfig.getFooterText());
		clientConfig.put("logoutUrl", controllerConfig.getLogoutUrl());
		clientConfig.put("loginUrl", controllerConfig.getLoginUrl());
		
		model.addAttribute("clientConfig", clientConfig);

		ServletRequest req = (ServletRequest) request;
		ServletResponse resp = (ServletResponse) response;
		FilterInvocation filterInvocation = new FilterInvocation(req, resp, new FilterChain() {
			public void doFilter(ServletRequest request, ServletResponse response)
					throws IOException, ServletException {
				throw new UnsupportedOperationException();
			}
		});

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null) {
			if (authentication.getPrincipal() instanceof User) {
				((User) authentication.getPrincipal()).eraseCredentials();
			}
			WebSecurityExpressionRoot sec = new WebSecurityExpressionRoot(authentication, filterInvocation);
			sec.setTrustResolver(new AuthenticationTrustResolverImpl());

			ClientSecurityContext clientSecurityContext = new ClientSecurityContext();
			clientSecurityContext.setAnonymous(sec.isAnonymous());
			clientSecurityContext.setAuthenticated(sec.isAuthenticated());
			clientSecurityContext.setFullyAuthenticated(sec.isFullyAuthenticated());
			clientSecurityContext.setPrincipal(sec.getPrincipal());
			clientSecurityContext.setRememberMe(sec.isRememberMe());
			clientSecurityContext.setAuthorities(sec.getAuthentication().getAuthorities());

			String securityContextString = objectMapper.writeValueAsString(clientSecurityContext);

			model.addAttribute("security", securityContextString);

		}

		// Load Core JS Libraries
		List<String> jsCoreLibResourceArray = new ArrayList<String>();
		for (String jsLib : controllerConfig.getJsCoreLibs()) {
			getResourcePaths(jsLib, jsCoreLibResourceArray);
		}
		model.addAttribute("jsCoreLibResources", jsCoreLibResourceArray);

		// Load JS Libraries
		List<String> jsLibResourceArray = new ArrayList<String>();
		for (String jsLib : controllerConfig.getJsLibs()) {
			getResourcePaths(jsLib, jsLibResourceArray);
		}
		model.addAttribute("jsLibResources", jsLibResourceArray);

		// Load Core Sprout JS
		List<String> jsCoreResourceArray = new ArrayList<String>();
		for (String jsCoreSearchPattern : controllerConfig.getJsCoreSearchPatterns()) {
			getResourcePaths(jsCoreSearchPattern, jsCoreResourceArray);
		}
		model.addAttribute("coreJsResources", jsCoreResourceArray);

		// Load JS Modules
		List<String> jsResourceArray = new ArrayList<String>();
		for (String jsModuleSearchPattern : controllerConfig.getJsModuleSearchPatterns()) {
			getResourcePaths(jsModuleSearchPattern, jsResourceArray);
		}
		model.addAttribute("moduleJsResources", jsResourceArray);

		// Load Core CSS Libraries
		List<String> cssCoreLibResourceArray = new ArrayList<String>();
		for (String cssLib : controllerConfig.getCssCoreLibs()) {
			getResourcePaths(cssLib, cssCoreLibResourceArray);
		}
		model.addAttribute("cssCoreLibResources", cssCoreLibResourceArray);

		// Load CSS Libraries
		List<String> cssLibResourceArray = new ArrayList<String>();
		for (String cssLib : controllerConfig.getCssLibs()) {
			getResourcePaths(cssLib, cssLibResourceArray);
		}
		model.addAttribute("cssLibResources", cssLibResourceArray);

		// Load CSS Modules
		List<String> cssResourceArray = new ArrayList<String>();
		for (String cssModuleSearchPattern : controllerConfig.getCssModuleSearchPatterns()) {
			getResourcePaths(cssModuleSearchPattern, cssResourceArray);
		}
		model.addAttribute("moduleCssResources", cssResourceArray);

		// Header
		model.addAttribute("headerView", controllerConfig.getHeaderView());
		// Footer
		model.addAttribute("footerView", controllerConfig.getFooterView());

		return "index";
	}

	private List<String> getResourcePaths(String pattern, List<String> resourceArray) {
		log.info(String.format("Finding embedded resource paths for: %s", pattern));
		PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
		try {
			Resource[] moduleResources = resolver.getResources(pattern);
			for (Resource resource : moduleResources) {
				log.debug(String.format("Processing resource: %s", resource));

				URL resourceURL = resource.getURL();
				log.debug(String.format("Found resource URL: %s", resourceURL));
				String protocol = resourceURL.getProtocol();
				if ("http".equals(protocol) || "https".equals(protocol)) {
					resourceArray.add(resourceURL.toString());
				} else {
					resourceArray.add(truncateBeginningOfPath(resourceURL.getPath() + "?v=" + buildNumber,
							controllerConfig.getResourcePath()));
				}

			}
		} catch (IOException e) {
			log.warn(String.format("Error processing resources for pattern: %s", pattern), e);
		}
		return resourceArray;
	}

	private String truncateBeginningOfPath(String fullPath, String stringToMatch) {
		if (fullPath == null || fullPath.length() == 0) {
			throw new RuntimeException("fullPath is null or empty.");
		}
		if (stringToMatch == null || stringToMatch.length() == 0) {
			throw new RuntimeException("stringToMatch is null or empty.");
		}
		int matchIndex = fullPath.indexOf(stringToMatch);
		int splitIndex = matchIndex + stringToMatch.length();
		if (matchIndex == -1) {
			return fullPath;
		} else {
			return fullPath.substring(splitIndex);
		}
	}

}