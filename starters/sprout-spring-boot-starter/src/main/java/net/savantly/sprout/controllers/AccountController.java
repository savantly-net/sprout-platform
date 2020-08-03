package net.savantly.sprout.controllers;

import java.util.Objects;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpRequestResponseHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.sprout.model.user.UserDto;

@RestController
public class AccountController {
	HttpSessionRequestCache cache = new HttpSessionRequestCache();

	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	SecurityContextRepository securityContextRepository;
	

	@GetMapping(value = "/api/account")
	public ResponseEntity account() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (Objects.isNull(auth)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		} else {
			return ResponseEntity.ok(new UserDto().setName(auth.getName()).setRoles(auth.getAuthorities().stream()
					.map((g)-> g.getAuthority()).collect(Collectors.toSet())));
		}
	}

	@PostMapping(value = "/api/login")
	public ResponseEntity<Authentication> login(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("username") String username, @RequestParam("password") String password)
			throws ServletException {
		
		cache.saveRequest(request, response);
		
		Authentication result = this.authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(username, password));

		HttpRequestResponseHolder holder = new  HttpRequestResponseHolder(request, response);
		SecurityContext securityContext = securityContextRepository.loadContext(holder);
		securityContext.setAuthentication(result);

		this.securityContextRepository.saveContext(securityContext, holder.getRequest(), holder.getResponse());

		return ResponseEntity.ok(result);
	}

	@GetMapping(value = "/api/login")
	public String login() {
		return "login";
	}

	@GetMapping("/api/logout")
	public String logout(HttpServletRequest request) throws ServletException {
		request.logout();
		return "redirect:/";
	}
}
