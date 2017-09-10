/* Copyright 2004, 2005, 2006 Acegi Technology Pty Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package net.savantly.sprout.core.security;

import java.io.Serializable;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.util.Assert;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import net.savantly.sprout.core.domain.PersistedModule;
import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.organization.Organization;
import net.savantly.sprout.core.security.roles.Role;

/**
 * Models core user information retrieved by a {@link UserDetailsService}.
 * <p>
 * Developers may use this class directly, subclass it, or write their own
 * {@link UserDetails} implementation from scratch.
 * <p>
 * {@code equals} and {@code hashcode} implementations are based on the {@code username}
 * property only, as the intention is that lookups of the same user principal object (in a
 * user registry, for example) will match where the objects represent the same user, not
 * just when all the properties (authorities, password for example) are the same.
 * <p>
 * Note that this implementation is not immutable. It implements the
 * {@code CredentialsContainer} interface, in order to allow the password to be erased
 * after authentication. This may cause side-effects if you are storing instances
 * in-memory and reusing them. If so, make sure you return a copy from your
 * {@code UserDetailsService} each time it is invoked.
 *
 * @author Ben Alex
 * @author Luke Taylor
 * @author Jeremy Branham (modified original)
 */
@Entity
public class SproutUser extends PersistedModule implements UserDetails, CredentialsContainer {

    private static final long serialVersionUID = 6629698068044899330L;

    // ~ Instance fields
    // ================================================================================================

    @JsonProperty(access = Access.WRITE_ONLY)
    private String password;
    private String username;
    private String displayName;
    private Set<EmailAddress> emailAddresses = new HashSet<>();
    private EmailAddress primaryEmailAddress;
    private boolean hidePrimaryEmailAddress;
    private String firstName;
    private String lastName;
    @JsonTypeInfo(use = com.fasterxml.jackson.annotation.JsonTypeInfo.Id.NONE)
    private Set<Role> authorities = new HashSet<Role>();
    private boolean accountNonExpired = true;
    private boolean accountNonLocked = true;
    private boolean credentialsNonExpired = true;
    private boolean enabled = true;
    private Organization organization;
    private String phoneNumber;

    private String clearTextPassword;

    // ~ Constructors
    // ===================================================================================================

    public SproutUser() {
    }

    public SproutUser(String username, String password, String firstName, String lastName) {
        this(username, password, firstName, lastName, true, true, true, true, new HashSet<Role>());
    }

    /**
     * Calls the more complex constructor with all boolean arguments set to {@code true}.
     */
    public SproutUser(String username, String password, String firstName, String lastName, Collection<? extends Role> authorities) {
        this(username, password, firstName, lastName, true, true, true, true, authorities);
    }

    /**
     * Construct the <code>User</code> with the details required by
     * {@link org.springframework.security.authentication.dao.DaoAuthenticationProvider}.
     *
     * @param username the username presented to the
     * <code>DaoAuthenticationProvider</code>
     * @param password the password that should be presented to the
     * <code>DaoAuthenticationProvider</code>
     * @param enabled set to <code>true</code> if the user is enabled
     * @param accountNonExpired set to <code>true</code> if the account has not expired
     * @param credentialsNonExpired set to <code>true</code> if the credentials have not
     * expired
     * @param accountNonLocked set to <code>true</code> if the account is not locked
     * @param authorities the authorities that should be granted to the caller if they
     * presented the correct username and password and the user is enabled. Not null.
     *
     * @throws IllegalArgumentException if a <code>null</code> value was passed either as
     * a parameter or as an element in the <code>GrantedAuthority</code> collection
     */
    public SproutUser(String username, String password, String firstName, String lastName, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends Role> authorities) {

        // if (((username == null) || "".equals(username)) || (password == null)) {
        // throw new IllegalArgumentException(
        // "Cannot pass null or empty values to constructor");
        // }

        this.username = username;
        this.clearTextPassword = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.enabled = enabled;
        this.accountNonExpired = accountNonExpired;
        this.credentialsNonExpired = credentialsNonExpired;
        this.accountNonLocked = accountNonLocked;
        this.authorities = sortAuthorities(authorities);
    }

    // ~ Methods
    // ========================================================================================================

    public void addAuthority(Role role) {
        this.authorities.add(role);
    }

    public void removeAuthority(Role role) {
        this.authorities.remove(role);
    }

    public void eraseCredentials() {
        password = null;
    }

    private static SortedSet<Role> sortAuthorities(Collection<? extends Role> authorities) {
        Assert.notNull(authorities, "Cannot pass a null GrantedAuthority collection");
        // Ensure array iteration order is predictable (as per
        // UserDetails.getAuthorities() contract and SEC-717)
        SortedSet<Role> sortedAuthorities = new TreeSet<Role>(new AuthorityComparator());

        for (Role grantedAuthority : authorities) {
            Assert.notNull(grantedAuthority, "GrantedAuthority list cannot contain any null elements");
            sortedAuthorities.add(grantedAuthority);
        }

        return sortedAuthorities;
    }

    private static class AuthorityComparator implements Comparator<GrantedAuthority>, Serializable {
        private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

        public int compare(GrantedAuthority g1, GrantedAuthority g2) {
            // Neither should ever be null as each entry is checked before adding it to
            // the set.
            // If the authority is null, it is a custom authority and should precede
            // others.
            if (g2.getAuthority() == null) {
                return -1;
            }

            if (g1.getAuthority() == null) {
                return 1;
            }

            return g1.getAuthority().compareTo(g2.getAuthority());
        }
    }

    /**
     * Returns {@code true} if the supplied object is a {@code User} instance with the
     * same {@code username} value.
     * <p>
     * In other words, the objects are equal if they have the same username, representing
     * the same principal.
     */
    @Override
    public boolean equals(Object rhs) {
        if (rhs instanceof SproutUser) {
            return username.equals(((SproutUser) rhs).username);
        }
        return false;
    }

    /**
     * Returns the hashcode of the {@code username}.
     */
    @Override
    public int hashCode() {
        return username.hashCode();
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(super.toString()).append(": ");
        sb.append("Username: ").append(this.username).append("; ");
        sb.append("Password: [PROTECTED]; ");
        sb.append("Enabled: ").append(this.enabled).append("; ");
        sb.append("AccountNonExpired: ").append(this.accountNonExpired).append("; ");
        sb.append("credentialsNonExpired: ").append(this.credentialsNonExpired).append("; ");
        sb.append("AccountNonLocked: ").append(this.accountNonLocked).append("; ");

        if (!authorities.isEmpty()) {
            sb.append("Granted Authorities: ");

            boolean first = true;
            for (GrantedAuthority auth : authorities) {
                if (!first) {
                    sb.append(",");
                }
                first = false;

                sb.append(auth);
            }
        } else {
            sb.append("Not granted any authorities");
        }

        return sb.toString();
    }

    // **********************************
    // GETTERS/SETTERS
    //
    // **********************************

    @ManyToMany(targetEntity = Role.class)
    public Set<Role> getAuthorities() {
        return authorities;
    }

    @Column(length=60)
    public String getPassword() {
        return password;
    }

    @Column(unique = true)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Size(min = 1)
    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    @OneToMany(fetch=FetchType.EAGER, cascade=CascadeType.REMOVE)
    public Set<EmailAddress> getEmailAddresses() {
        return emailAddresses;
    }

    protected void setEmailAddresses(Set<EmailAddress> emailAddresses) {
        this.emailAddresses = emailAddresses;
    }

    @NotNull
    @OneToOne(cascade=CascadeType.REMOVE)
    public EmailAddress getPrimaryEmailAddress() {
        return primaryEmailAddress;
    }

    public void setPrimaryEmailAddress(EmailAddress primaryEmailAddress) {
        this.primaryEmailAddress = primaryEmailAddress;
    }

    public boolean isHidePrimaryEmailAddress() {
        return hidePrimaryEmailAddress;
    }

    public void setHidePrimaryEmailAddress(boolean hidePrimaryEmailAddress) {
        this.hidePrimaryEmailAddress = hidePrimaryEmailAddress;
    }

    public void setAuthorities(Set<Role> authorities) {
        this.authorities = sortAuthorities(authorities);
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        this.accountNonExpired = accountNonExpired;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        this.accountNonLocked = accountNonLocked;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        this.credentialsNonExpired = credentialsNonExpired;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setClearTextPassword(String password) {
        this.clearTextPassword = password;
    }
    @Transient
    public String getClearTextPassword() {
        return this.clearTextPassword;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Transient
    public String getGravatarUrl() {
        return String.format("https://www.gravatar.com/avatar/%s?s=200&d=identicon", MD5Util.md5Hex(primaryEmailAddress.getEmailAddress()));
    }

    // ************************
    // Rich domain methods
    // ************************

    /**
     * Add an email address to associate to the user.
     * If this is the first address added, make it the primary email address
     * 
     * @param emailAddress
     * @return true is the email address was added, false if the email already existed
     */
    public boolean addEmailAddress(EmailAddress emailAddress) {
        boolean added = this.emailAddresses.add(emailAddress);
        if (this.emailAddresses.size() == 1) {
            this.setPrimaryEmailAddress(emailAddress);
        }
        return added;
    }

    public void addEmailAddress(Collection<EmailAddress> emailAddresses) {
        for (EmailAddress emailAddress : emailAddresses) {
            if (!this.emailAddresses.contains(emailAddress))
                this.addEmailAddress(emailAddress);
        }
    }

    @ManyToOne(fetch=FetchType.EAGER)
    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization memberOf) {
        this.organization = memberOf;
    }

    public void clearEmailAddresses() {
        this.emailAddresses.clear();
    }

    public boolean hasRole(String role) {
        String roleString = role.toUpperCase();
        boolean result = this.authorities.stream().anyMatch(r -> r.getAuthority().equals(roleString));
        return result;
    }
    
    @Transient
    public boolean hasNewPassword(){
        return (this.clearTextPassword != null);
    }

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

}
