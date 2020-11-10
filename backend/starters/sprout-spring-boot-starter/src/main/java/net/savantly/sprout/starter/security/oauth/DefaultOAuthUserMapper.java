package net.savantly.sprout.starter.security.oauth;

import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.user.OAuth2User;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.oauth.OAuthAccount;
import net.savantly.sprout.core.domain.organization.Organization;
import net.savantly.sprout.core.security.role.Role;

public class DefaultOAuthUserMapper implements OAuthUserMapper {

	
	// TODO: get user from repository and possibly update them
	@Override
	public SproutOAuthUser mapUser(OAuth2User user, OAuth2AuthorizedClient client) {
		return new SproutOAuthUser() {
			
			@Override
			public String getName() {
				return user.getName();
			}
			
			@Override
			public Map<String, Object> getAttributes() {
				return user.getAttributes();
			}
			
			@Override
			public boolean isEnabled() {
				return true;
			}
			
			@Override
			public boolean isCredentialsNonExpired() {
				return true;
			}
			
			@Override
			public boolean isAccountNonLocked() {
				return true;
			}
			
			@Override
			public boolean isAccountNonExpired() {
				return true;
			}
			
			@Override
			public String getUsername() {
				return client.getPrincipalName();
			}
			
			@Override
			public String getPassword() {
				return null;
			}
			
			@Override
			public Collection<? extends GrantedAuthority> getAuthorities() {
				return user.getAuthorities();
			}
			
			@Override
			public boolean isHidePrimaryEmailAddress() {
				return false;
			}
			
			@Override
			public boolean hasAuthority(String role) {
				return true;
			}
			
			@Override
			public Set<Role> getRoles() {
				return user.getAttribute("roles");
			}
			
			@Override
			public EmailAddress getPrimaryEmailAddress() {
				return user.getAttribute("email");
			}
			
			@Override
			public String getPhoneNumber() {
				return user.getAttribute("phone_number");
			}
			
			@Override
			public Organization getOrganization() {
				return null;
			}
			
			@Override
			public Set<OAuthAccount> getOAuthAccounts() {
				return new HashSet<OAuthAccount>();
			}
			
			@Override
			public String getLastName() {
				return user.getAttribute("given_name");
			}
			
			@Override
			public String getGravatarUrl() {
				return user.getAttribute("picture_url");
			}
			
			@Override
			public String getFirstName() {
				return user.getAttribute("first_name");
			}
			
			@Override
			public Set<EmailAddress> getEmailAddresses() {
				return new HashSet<>();
			}
			
			@Override
			public String getDisplayName() {
				return user.getAttribute("nickname");
			}
		};
	}

}
