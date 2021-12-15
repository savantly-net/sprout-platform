package net.savantly.sprout.core.domain.user;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.organization.Organization;
import net.savantly.sprout.core.domain.role.Role;

public interface SproutUser extends UserDetails {

	String getUuid();

	String getDisplayName();

	Set<EmailAddress> getEmailAddresses();

	EmailAddress getPrimaryEmailAddress();

	boolean isHidePrimaryEmailAddress();

	String getFirstName();

	String getLastName();

	String getGravatarUrl();

	Organization getOrganization();

	boolean hasAuthority(String role);

	String getPhoneNumber();

	Set<? extends Role> getRoles();
	
	static SproutUser anonymousUser() {
		return new SproutUser() {

			@Override
			public String getUuid() {
				return "";
			}
			
			@Override
			public boolean isEnabled() {
				return false;
			}
			
			@Override
			public boolean isCredentialsNonExpired() {
				return false;
			}
			
			@Override
			public boolean isAccountNonLocked() {
				return false;
			}
			
			@Override
			public boolean isAccountNonExpired() {
				return false;
			}
			
			@Override
			public String getUsername() {
				return "anonymousUser";
			}
			
			@Override
			public String getPassword() {
				return null;
			}
			
			@Override
			public Collection<? extends GrantedAuthority> getAuthorities() {
				return Arrays.asList(new SimpleGrantedAuthority("ANONYMOUS"));
			}
			
			@Override
			public boolean isHidePrimaryEmailAddress() {
				return false;
			}
			
			@Override
			public boolean hasAuthority(String role) {
				return false;
			}
			
			@Override
			public Set<Role> getRoles() {
				return new HashSet<>();
			}
			
			@Override
			public EmailAddress getPrimaryEmailAddress() {
				return null;
			}
			
			@Override
			public String getPhoneNumber() {
				return null;
			}
			
			@Override
			public Organization getOrganization() {
				return null;
			}
			
			@Override
			public String getLastName() {
				return null;
			}
			
			@Override
			public String getGravatarUrl() {
				return null;
			}
			
			@Override
			public String getFirstName() {
				return null;
			}
			
			@Override
			public Set<EmailAddress> getEmailAddresses() {
				return new HashSet<>();
			}
			
			@Override
			public String getDisplayName() {
				return null;
			}
		};
	}
}