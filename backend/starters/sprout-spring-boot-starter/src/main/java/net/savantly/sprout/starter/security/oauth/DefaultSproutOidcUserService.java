package net.savantly.sprout.starter.security.oauth;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.starter.security.PermissionAwareSproutUserService;

public class DefaultSproutOidcUserService extends OidcUserService {
	
	private final PermissionAwareSproutUserService userService;
	
	public DefaultSproutOidcUserService(PermissionAwareSproutUserService userService) {
		this.userService = userService;
	}

	@Override
	public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
		OidcUser user = super.loadUser(userRequest);
		
		SproutUser sproutUser = this.userService.loadUserByUsername(user.getEmail());
		
		List<GrantedAuthority> mappedAuthorities = new ArrayList<>();
		mappedAuthorities.addAll(sproutUser.getAuthorities().stream().collect(Collectors.toList()));
		mappedAuthorities.add(new SimpleGrantedAuthority("OIDC_USER"));
		return new DefaultOidcUser(mappedAuthorities, user.getIdToken());
	}
}
