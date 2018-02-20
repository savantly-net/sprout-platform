package net.savantly.sprout.core.domain.user;

import java.util.Set;

import org.springframework.security.core.userdetails.UserDetails;

import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.oauth.OAuthAccount;
import net.savantly.sprout.core.domain.organization.Organization;
import net.savantly.sprout.core.security.role.Role;

public interface SproutUser extends UserDetails {

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

	Set<OAuthAccount> getoAuthAccounts();
	
	Set<Role> getRoles();

}