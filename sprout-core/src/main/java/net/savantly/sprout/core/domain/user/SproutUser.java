package net.savantly.sprout.core.domain.user;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.oauth.OAuthAccount;
import net.savantly.sprout.core.domain.organization.Organization;
import net.savantly.sprout.core.security.roles.Role;

public interface SproutUser {

	Set<Role> getAuthorities();

	String getPassword();

	String getUsername();

	String getDisplayName();

	boolean isEnabled();

	boolean isAccountNonExpired();

	boolean isAccountNonLocked();

	boolean isCredentialsNonExpired();

	Set<EmailAddress> getEmailAddresses();

	EmailAddress getPrimaryEmailAddress();

	boolean isHidePrimaryEmailAddress();

	String getFirstName();

	String getLastName();

	String getGravatarUrl();

	Organization getOrganization();

	boolean hasRole(String role);

	String getPhoneNumber();

	Set<OAuthAccount> getoAuthAccounts();

}