package net.savantly.sprout.starter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import net.savantly.sprout.core.SproutControllerConfiguration;
import net.savantly.sprout.core.module.ModuleResourceProvider;

@Controller
public class DefaultSproutBaseController implements SproutBaseController {
	static final Logger log = LoggerFactory.getLogger(DefaultSproutBaseController.class);
	
	@Value("${spring.application.name:Sprout}")
	private String appName;

	private ObjectMapper objectMapper;
	private SproutControllerConfiguration controllerConfig;
	private ModuleResourceProvider resourceProvider;
	
	

	public DefaultSproutBaseController(ObjectMapper objectMapper, SproutControllerConfiguration controllerConfig,
			ModuleResourceProvider resourceProvider) {
		this.objectMapper = objectMapper;
		this.controllerConfig = controllerConfig;
		this.resourceProvider = resourceProvider;
	}

	@Override
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

		model.addAttribute("jsResources", resourceProvider.getJsResources());
		model.addAttribute("cssResources", resourceProvider.getCssResources());

		// Header
		model.addAttribute("headerView", controllerConfig.getHeaderView());
		// Footer
		model.addAttribute("footerView", controllerConfig.getFooterView());

		return "index";
	}
}