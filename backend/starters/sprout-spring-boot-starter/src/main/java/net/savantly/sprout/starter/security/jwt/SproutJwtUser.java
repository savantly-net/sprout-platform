package net.savantly.sprout.starter.security.jwt;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.oauth.OAuthAccount;
import net.savantly.sprout.core.domain.organization.Organization;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.security.role.Role;

public class SproutJwtUser implements SproutUser {
	private final JwtAuthenticationToken token;
	
	public SproutJwtUser(JwtAuthenticationToken token) {
		this.token = token;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return token.getAuthorities();
	}

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public String getUsername() {
		return token.getName();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public String getDisplayName() {
		return token.getName();
	}

	@Override
	public Set<EmailAddress> getEmailAddresses() {
		return new HashSet<>();
	}

	@Override
	public EmailAddress getPrimaryEmailAddress() {
		String emailAddress = token.getToken().getClaimAsString("email");
		return new EmailAddress(emailAddress);
	}

	@Override
	public boolean isHidePrimaryEmailAddress() {
		return false;
	}

	@Override
	public String getFirstName() {
		return token.getToken().getClaimAsString("first_name");
	}

	@Override
	public String getLastName() {
		return token.getToken().getClaimAsString("last_name");
	}

	@Override
	public String getGravatarUrl() {
		return null;
	}

	@Override
	public Organization getOrganization() {
		return null;
	}

	@Override
	public boolean hasAuthority(String role) {
		return token.getAuthorities().contains(new SimpleGrantedAuthority(role));
	}

	@Override
	public String getPhoneNumber() {
		return token.getToken().getClaimAsString("phone");
	}

	@Override
	public Set<OAuthAccount> getOAuthAccounts() {
		return null;
	}

	@Override
	public Set<Role> getRoles() {
		return Collections.EMPTY_SET;
	}

}
