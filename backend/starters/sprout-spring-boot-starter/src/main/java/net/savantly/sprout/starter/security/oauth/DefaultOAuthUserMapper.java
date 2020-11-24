package net.savantly.sprout.starter.security.oauth;

import java.util.Collection;
import java.util.Map;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.user.OAuth2User;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.oauth.OAuthAccount;
import net.savantly.sprout.core.domain.organization.Organization;
import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.security.role.Role;

public class DefaultOAuthUserMapper implements OAuthUserMapper {

	private final OAuth2UserSynchronizer userService;

	public DefaultOAuthUserMapper(OAuth2UserSynchronizer synchronizer) {
		this.userService = synchronizer;
	}

	@Override
	public SproutOAuthUser mapUser(OAuth2User user, OAuth2AuthorizedClient client) {

		SproutUser sproutUser = this.userService.syncUser(user);

		return new SproutOAuthUser() {

			/**
			 * 
			 */
			private static final long serialVersionUID = 1L;

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
				return sproutUser.isEnabled();
			}

			@Override
			public boolean isCredentialsNonExpired() {
				return sproutUser.isCredentialsNonExpired();
			}

			@Override
			public boolean isAccountNonLocked() {
				return sproutUser.isAccountNonLocked();
			}

			@Override
			public boolean isAccountNonExpired() {
				return sproutUser.isAccountNonExpired();
			}

			@Override
			public String getUsername() {
				return sproutUser.getUsername();
			}

			@Override
			public String getPassword() {
				return null;
			}

			@Override
			public Collection<? extends GrantedAuthority> getAuthorities() {
				return sproutUser.getAuthorities();
			}

			@Override
			public boolean isHidePrimaryEmailAddress() {
				return sproutUser.isHidePrimaryEmailAddress();
			}

			@Override
			public boolean hasAuthority(String role) {
				return sproutUser.hasAuthority(role);
			}

			@Override
			public Set<Role> getRoles() {
				return sproutUser.getRoles();
			}

			@Override
			public EmailAddress getPrimaryEmailAddress() {
				return sproutUser.getPrimaryEmailAddress();
			}

			@Override
			public String getPhoneNumber() {
				return sproutUser.getPhoneNumber();
			}

			@Override
			public Organization getOrganization() {
				return sproutUser.getOrganization();
			}

			@Override
			public Set<OAuthAccount> getOAuthAccounts() {
				return sproutUser.getOAuthAccounts();
			}

			@Override
			public String getLastName() {
				return sproutUser.getLastName();
			}

			@Override
			public String getGravatarUrl() {
				return sproutUser.getGravatarUrl();
			}

			@Override
			public String getFirstName() {
				return sproutUser.getFirstName();
			}

			@Override
			public Set<EmailAddress> getEmailAddresses() {
				return sproutUser.getEmailAddresses();
			}

			@Override
			public String getDisplayName() {
				return sproutUser.getDisplayName();
			}
		};
	}

}
