package net.savantly.sprout.domain.account;

import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.sprout.model.user.UserDto;

@RequestMapping("/api/account")
@RestController
public class AccountApi {
	
	final private String logoutUrl;
	
	public AccountApi(final String logoutUrl) {
		this.logoutUrl = logoutUrl;
	}

	@GetMapping
	public ResponseEntity<UserDto> getAccountInfo() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (Objects.isNull(auth)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		} else {
			return ResponseEntity.ok(toDto(auth));
		}
	}

	private UserDto toDto(Authentication auth) {
		return new UserDto()
				.setName(auth.getName())
				.setLogoutUrl(this.logoutUrl)
				.setAuthorities(auth.getAuthorities().stream().map((g) -> g.getAuthority()).collect(Collectors.toSet()));
	}
}
