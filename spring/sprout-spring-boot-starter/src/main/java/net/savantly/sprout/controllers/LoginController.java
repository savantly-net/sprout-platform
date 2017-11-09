package net.savantly.sprout.controllers;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {

	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	SecurityContextRepository securityContextRepository;

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String login(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("username") String username, @RequestParam("password") String password)
			throws ServletException {
		Authentication result = this.authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(username, password));

		SecurityContextHolder.getContext().setAuthentication(result);

		this.securityContextRepository.saveContext(SecurityContextHolder.getContext(), request, response);

		// TODO:
		// SavedRequest savedRequest = securityContextRepository.loadContext(requestResponseHolder).getRequest(request, response);
		return "redirect:/admin/";

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
