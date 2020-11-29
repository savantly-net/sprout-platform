package net.savantly.sprout.starter.security;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import net.savantly.authorization.service.PermissionProvider;
import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.organization.Organization;
import net.savantly.sprout.core.domain.role.Role;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.UserUpdateDto;
import net.savantly.sprout.core.security.users.SproutUserService;

public class PermissionAwareSproutUserService implements SproutUserService {
	
	public final static String BEAN_NAME = "permissionAwareSproutUserService";
	
	private final PermissionProvider permissionProvider;
	private final SproutUserService userDetailsService;
	
	public PermissionAwareSproutUserService(SproutUserService userDetailsService,
			PermissionProvider permissionProvider) {
		this.userDetailsService = userDetailsService;
		this.permissionProvider = permissionProvider;
	}
	
	@Override
	/**
	 * Gets the user with the processed effective permissions
	 */
	public SproutUser loadUserByUsername(String username) throws UsernameNotFoundException {
		SproutUser userDetails = this.userDetailsService.loadUserByUsername(username);
		List<GrantedAuthority> permissions = extractPermissions(userDetails);
		return new SproutUserWrapper(userDetails, permissions);
	}

	private List<GrantedAuthority> extractPermissions(UserDetails userDetails) {
		List<GrantedAuthority> permissions = userDetails.getAuthorities().stream()
			.flatMap(a -> permissionProvider.getEffectivePermissions(a.getAuthority()).stream()).distinct()
			.map(p -> new SimpleGrantedAuthority(p))
			.collect(Collectors.toList());
		// add the original authorities back to the list
		permissions.addAll(userDetails.getAuthorities());
		return permissions;
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
	
	private static class SproutUserWrapper implements SproutUser {
		
		private SproutUser userDetails;
		private List<GrantedAuthority> permissions;

		public SproutUserWrapper(SproutUser userDetails, List<GrantedAuthority> permissions) {
			this.userDetails = userDetails;
			this.permissions = permissions;
		}

		@Override
		public Collection<? extends GrantedAuthority> getAuthorities() {
			return permissions;
		}

		@Override
		public String getPassword() {
			return userDetails.getPassword();
		}

		@Override
		public String getUsername() {
			return userDetails.getUsername();
		}

		@Override
		public boolean isAccountNonExpired() {
			return userDetails.isAccountNonExpired();
		}

		@Override
		public boolean isAccountNonLocked() {
			return userDetails.isAccountNonLocked();
		}

		@Override
		public boolean isCredentialsNonExpired() {
			return userDetails.isCredentialsNonExpired();
		}

		@Override
		public boolean isEnabled() {
			return userDetails.isEnabled();
		}

		@Override
		public String getDisplayName() {
			return userDetails.getDisplayName();
		}

		@Override
		public Set<EmailAddress> getEmailAddresses() {
			return userDetails.getEmailAddresses();
		}

		@Override
		public EmailAddress getPrimaryEmailAddress() {
			return userDetails.getPrimaryEmailAddress();
		}

		@Override
		public boolean isHidePrimaryEmailAddress() {
			return userDetails.isHidePrimaryEmailAddress();
		}

		@Override
		public String getFirstName() {
			return userDetails.getFirstName();
		}

		@Override
		public String getLastName() {
			return userDetails.getLastName();
		}

		@Override
		public String getGravatarUrl() {
			return userDetails.getGravatarUrl();
		}

		@Override
		public Organization getOrganization() {
			return userDetails.getOrganization();
		}

		@Override
		public boolean hasAuthority(String role) {
			return userDetails.hasAuthority(role);
		}

		@Override
		public String getPhoneNumber() {
			return userDetails.getPhoneNumber();
		}

		@Override
		public Set<Role> getRoles() {
			return userDetails.getRoles();
		}
		
	}

}
