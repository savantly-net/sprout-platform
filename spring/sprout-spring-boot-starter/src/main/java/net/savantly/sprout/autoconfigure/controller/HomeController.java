package net.savantly.sprout.autoconfigure.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
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

import net.savantly.sprout.core.resource.SproutResourcePatternResolver;

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

	private final SproutResourcePatternResolver<HomeController> patternResolver = SproutResourcePatternResolver
			.of(HomeController.class);
	private ArrayList<String> jsCoreLibResourceArray;
	private ArrayList<String> jsLibResourceArray;
	private ArrayList<String> jsCoreResourceArray;
	private ArrayList<String> jsResourceArray;
	private ArrayList<String> cssCoreLibResourceArray;
	private ArrayList<String> cssLibResourceArray;
	private ArrayList<String> cssResourceArray;

	@PostConstruct
	public void post() {
		// Load Core JS Libraries
		jsCoreLibResourceArray = new ArrayList<String>();
		for (String jsLib : controllerConfig.getJsCoreLibs()) {
			getResourcePaths(jsLib, jsCoreLibResourceArray);
		}
		// Load JS Libraries
		jsLibResourceArray = new ArrayList<String>();
		for (String jsLib : controllerConfig.getJsLibs()) {
			getResourcePaths(jsLib, jsLibResourceArray);
		}
		// Load Core Sprout JS
		jsCoreResourceArray = new ArrayList<String>();
		for (String jsCoreSearchPattern : controllerConfig.getJsCoreSearchPatterns()) {
			getResourcePaths(jsCoreSearchPattern, jsCoreResourceArray);
		}
		// Load JS Modules
		jsResourceArray = new ArrayList<String>();
		for (String jsModuleSearchPattern : controllerConfig.getJsModuleSearchPatterns()) {
			getResourcePaths(jsModuleSearchPattern, jsResourceArray);
		}
		// Load Core CSS Libraries
		cssCoreLibResourceArray = new ArrayList<String>();
		for (String cssLib : controllerConfig.getCssCoreLibs()) {
			getResourcePaths(cssLib, cssCoreLibResourceArray);
		}
		// Load CSS Libraries
		cssLibResourceArray = new ArrayList<String>();
		for (String cssLib : controllerConfig.getCssLibs()) {
			getResourcePaths(cssLib, cssLibResourceArray);
		}
		// Load CSS Modules
		cssResourceArray = new ArrayList<String>();
		for (String cssModuleSearchPattern : controllerConfig.getCssModuleSearchPatterns()) {
			getResourcePaths(cssModuleSearchPattern, cssResourceArray);
		}
	}

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

		model.addAttribute("jsCoreLibResources", jsCoreLibResourceArray);
		model.addAttribute("jsLibResources", jsLibResourceArray);
		model.addAttribute("coreJsResources", jsCoreResourceArray);
		model.addAttribute("moduleJsResources", jsResourceArray);
		model.addAttribute("cssCoreLibResources", cssCoreLibResourceArray);
		model.addAttribute("cssLibResources", cssLibResourceArray);
		model.addAttribute("moduleCssResources", cssResourceArray);

		// Header
		model.addAttribute("headerView", controllerConfig.getHeaderView());
		// Footer
		model.addAttribute("footerView", controllerConfig.getFooterView());

		return "index";
	}

	private void getResourcePaths(String path, List<String> resourceArray) {
		patternResolver.getResourcePaths(path, resourceArray, true, controllerConfig.getResourcePath(), true,
				"?v=" + buildNumber);
		;
	}

}