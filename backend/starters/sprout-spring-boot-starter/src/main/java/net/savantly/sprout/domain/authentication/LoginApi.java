package net.savantly.sprout.domain.authentication;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpRequestResponseHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties.OAuthFlowType;
import net.savantly.sprout.core.domain.role.RoleRepository;
import net.savantly.sprout.core.domain.user.repository.UserRepository;
import net.savantly.sprout.domain.authentication.oauth.ImplicitFlowDto;
import net.savantly.sprout.model.user.UserDto;
import net.savantly.sprout.model.user.UsernameAndPassword;

@RestController
public class LoginApi {
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

	@Autowired
	SproutConfigurationProperties configuration;

	@GetMapping("/api/authentication/oauth")
	public ResponseEntity<HashMap<String, Object>> getImplicitOAuthClients() {
		HashMap<String, Object> response = new HashMap<>();
		List<ImplicitFlowDto> implicitFlows = configuration.getSecurity().getAuthentication().getOauth().getClients().stream()
				.filter(c -> c.getFlowType().equals(OAuthFlowType.IMPLICIT))
				.map(c -> new ImplicitFlowDto()
						.setAuthorizationUrl(c.getAuthorizationUrl())
						.setClientId(c.getClientId())
						.setDisplayName(c.getDisplayName())
						.setIssuerUri(c.getIssuerUri())
						.setName(c.getName())
						.setRedirectUrl(c.getRedirectUrl())
						.setScope(c.getScope())
						.setTokenUrl(c.getTokenUrl())
						.setUserInfoUrl(c.getUserInfoUrl())
						.setAutoLogin(c.isAutoLogin())
						.setLogoutUrl(c.getLogoutUrl()))
				.collect(Collectors.toList());
		response.put("clients", implicitFlows);
		return ResponseEntity.ok(response);
	}

	@PostMapping(value = "/api/login")
	public ResponseEntity<UserDto> login(HttpServletRequest request, HttpServletResponse response,
			@RequestBody UsernameAndPassword authRequest) throws ServletException {

		cache.saveRequest(request, response);

		Authentication result = this.authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

		HttpRequestResponseHolder holder = new HttpRequestResponseHolder(request, response);
		SecurityContext securityContext = securityContextRepository.loadContext(holder);
		securityContext.setAuthentication(result);

		this.securityContextRepository.saveContext(securityContext, holder.getRequest(), holder.getResponse());

		return ResponseEntity.ok(toDto(result));
	}

	@GetMapping("/api/logout")
	public ResponseEntity<Void> logout(HttpServletRequest request) throws ServletException {
		request.logout();
		return ResponseEntity.accepted().build();
	}

	private UserDto toDto(Authentication auth) {
		return new UserDto().setName(auth.getName()).setAuthorities(
				auth.getAuthorities().stream().map((g) -> g.getAuthority()).collect(Collectors.toSet()));
	}
}
