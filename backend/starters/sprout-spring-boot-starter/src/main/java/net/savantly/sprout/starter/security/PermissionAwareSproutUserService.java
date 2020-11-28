package net.savantly.sprout.starter.security;

import java.util.Collection;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import net.savantly.authorization.service.PermissionAwareUserDetailsService;
import net.savantly.authorization.service.PermissionProvider;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.UserUpdateDto;
import net.savantly.sprout.core.security.users.SproutUserService;

public class PermissionAwareSproutUserService extends PermissionAwareUserDetailsService implements SproutUserService {
	
	public final static String BEAN_NAME = "permissionAwareSproutUserService";

	private SproutUserService userDetailsService;
	public PermissionAwareSproutUserService(SproutUserService userDetailsService,
			PermissionProvider permissionProvider) {
		super(userDetailsService, permissionProvider);
		this.userDetailsService = userDetailsService;
	}
	
	@Override
	/**
	 * Gets the user with the processed effective permissions
	 */
	public SproutUser loadUserByUsername(String username) throws UsernameNotFoundException {
		return userDetailsService.loadUserByUsername(username);
	}

	@Override
	public boolean usernameExists(String username) {
		return userDetailsService.usernameExists(username);
	}

	@Override
	/**
	 * Calls loadUserByUsername internally to return a user with processed effective permissions
	 */
	public SproutUser loadByEmailAddress(String emailAddress) {
		SproutUser user = userDetailsService.loadByEmailAddress(emailAddress);
		return loadUserByUsername(user.getUsername());
	}

	@Override
	/**
	 * Creates a user, then calls loadUserByUsername internally to return a user with processed effective permissions
	 */
	public SproutUser createUser(String username, String password, String emailAddress, Collection<String> roles) {
		SproutUser user = userDetailsService.createUser(username, password, emailAddress, roles);
		return loadUserByUsername(user.getUsername());
	}

	public boolean emailAddressExists(String email) {
		return userDetailsService.emailAddressExists(email);
	}

	@Override
	public void updatePassword(SproutUser user, String clearText) {
		userDetailsService.updatePassword(user, clearText);
	}

	@Override
	public SproutUser updateUser(UserUpdateDto user) {
		return userDetailsService.updateUser(user);
	}

}
