package net.savantly.sprout.starter.security;

import java.util.Collection;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import net.savantly.authorization.service.PermissionAwareUserDetailsService;
import net.savantly.authorization.service.PermissionProvider;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.security.SproutUserService;

public class PermissionAwareSproutUserService extends PermissionAwareUserDetailsService implements SproutUserService {

	private SproutUserService userDetailsService;
	public PermissionAwareSproutUserService(SproutUserService userDetailsService,
			PermissionProvider permissionProvider) {
		super(userDetailsService, permissionProvider);
		this.userDetailsService = userDetailsService;
	}
	
	@Override
	public SproutUser loadUserByUsername(String username) throws UsernameNotFoundException {
		return userDetailsService.loadUserByUsername(username);
	}

	@Override
	public boolean usernameExists(String username) {
		return userDetailsService.usernameExists(username);
	}

	@Override
	public SproutUser loadByEmailAddress(String emailAddress) {
		return userDetailsService.loadByEmailAddress(emailAddress);
	}

	@Override
	public SproutUser createUser(String username, String password, String emailAddress, Collection<String> roles) {
		return userDetailsService.createUser(username, password, emailAddress, roles);
	}

}
