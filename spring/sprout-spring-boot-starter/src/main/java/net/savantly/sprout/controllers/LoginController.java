package net.savantly.sprout.controllers;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpRequestResponseHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {
	HttpSessionRequestCache cache = new HttpSessionRequestCache();

	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	SecurityContextRepository securityContextRepository;

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String login(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("username") String username, @RequestParam("password") String password)
			throws ServletException {
		
		cache.saveRequest(request, response);
		
		Authentication result = this.authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(username, password));

		HttpRequestResponseHolder holder = new  HttpRequestResponseHolder(request, response);
		SecurityContext securityContext = securityContextRepository.loadContext(holder);
		securityContext.setAuthentication(result);

		this.securityContextRepository.saveContext(securityContext, holder.getRequest(), holder.getResponse());

		
		SavedRequest savedRequest = cache.getRequest(holder.getRequest(), holder.getResponse());
		
		if (savedRequest != null && savedRequest.getRedirectUrl() != null && !savedRequest.getRedirectUrl().endsWith("login")) {
			String redirectUrl = savedRequest.getRedirectUrl();
			return redirectUrl;
		} else {
			return "redirect:/admin/";
		}
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login() {
		return "login";
	}

	@RequestMapping("/logout")
	public String logout(HttpServletRequest request) throws ServletException {
		request.logout();
		return "redirect:/";
	}
}
