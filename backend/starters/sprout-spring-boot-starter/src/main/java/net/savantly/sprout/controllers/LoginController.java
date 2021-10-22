package net.savantly.sprout.controllers;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2ClientProperties;
import org.springframework.boot.context.properties.bind.Bindable;
import org.springframework.boot.context.properties.bind.Binder;
import org.springframework.context.ApplicationContext;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {

	private static final Bindable<Map<String, OAuth2ClientProperties.Registration>> STRING_REGISTRATION_MAP = Bindable
			.mapOf(String.class, OAuth2ClientProperties.Registration.class);

	private ApplicationContext context;

	public LoginController(ApplicationContext context) {
		this.context = context;
	}

	@PostMapping("/login")
	public ModelAndView getLoginPage() {
		Map<String, Object> model = new HashMap<>();
		model.put("authorizationBaseUri",
				OAuth2AuthorizationRequestRedirectFilter.DEFAULT_AUTHORIZATION_REQUEST_BASE_URI);
		model.put("oauthClients", getOAuthClients());
		return new ModelAndView("login", model);
	}

	private List<String> getOAuthClients() {
		return getRegistrations().entrySet().stream().map(entry -> entry.getKey()).collect(Collectors.toList());
	}

	private Map<String, OAuth2ClientProperties.Registration> getRegistrations() {
		return Binder.get(context.getEnvironment())
				.bind("spring.security.oauth2.client.registration", STRING_REGISTRATION_MAP)
				.orElse(Collections.emptyMap());
	}
}
