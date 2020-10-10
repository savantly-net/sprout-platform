package net.savantly.sprout.controllers;

import java.util.Objects;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpRequestResponseHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.core.security.role.RoleRepository;
import net.savantly.sprout.model.user.UserDto;
import net.savantly.sprout.model.user.UsernameAndPassword;

@RestController
public class AccountApi {
	HttpSessionRequestCache cache = new HttpSessionRequestCache();

	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	SecurityContextRepository securityContextRepository;
	@Autowired
	UserRepository users;
	@Autowired
	RoleRepository roles;
	@Autowired
    PasswordEncoder encoder;
	

	@GetMapping(value = "/api/account")
	public ResponseEntity<UserDto> getAccountInfo() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (Objects.isNull(auth)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		} else {
			return ResponseEntity.ok(toDto(auth));
		}
	}

	@PostMapping(value = "/api/login")
	public ResponseEntity<UserDto> login(HttpServletRequest request, HttpServletResponse response,
			@RequestBody UsernameAndPassword authRequest)
			throws ServletException {
		
		cache.saveRequest(request, response);
		
		Authentication result = this.authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

		HttpRequestResponseHolder holder = new  HttpRequestResponseHolder(request, response);
		SecurityContext securityContext = securityContextRepository.loadContext(holder);
		securityContext.setAuthentication(result);

		this.securityContextRepository.saveContext(securityContext, holder.getRequest(), holder.getResponse());

		return ResponseEntity.ok(toDto(result));
	}

	@GetMapping("/api/logout")
	public String logout(HttpServletRequest request) throws ServletException {
		request.logout();
		return "redirect:/";
	}

	private UserDto toDto(Authentication auth) {
		return new UserDto().setName(auth.getName()).setAuthorities(auth.getAuthorities().stream()
				.map((g)-> g.getAuthority()).collect(Collectors.toSet()));
	}
}
