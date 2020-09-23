package net.savantly.sprout.core.domain.user;

import java.io.Serializable;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import javax.validation.constraints.Size;

import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;
import org.springframework.util.Assert;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import lombok.Getter;
import lombok.Setter;
import net.savantly.sprout.core.domain.PersistedDomainObject;
import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.oauth.OAuthAccount;
import net.savantly.sprout.core.domain.organization.Organization;
import net.savantly.sprout.core.security.MD5Util;
import net.savantly.sprout.core.security.privilege.Privilege;
import net.savantly.sprout.core.security.role.Role;

@Getter @Setter
@Entity
public class SproutUserEntity extends PersistedDomainObject implements CredentialsContainer, SproutUser {

    private static final long serialVersionUID = 6629698068044899330L;

    // ~ Instance fields
    // ================================================================================================

    @JsonIgnore
	@Column(length=60)
    private String password;
    @JsonIgnore
    public String getPassword() {
    	return this.password;
    }
    @JsonProperty
    public String setPassword(String password) {
    	this.password = password;
    	return password;
    }
    
	@Column(unique = true)
    private String username;

	@Size(min = 1)
    private String displayName;
	
    private boolean hidePrimaryEmailAddress;
    private String firstName;
    private String lastName;
    private boolean accountNonExpired = true;
    private boolean accountNonLocked = true;
    private boolean credentialsNonExpired = true;
    private boolean enabled = true;
    private String phoneNumber;
    
	@ManyToOne(fetch=FetchType.EAGER)
    private Organization organization;
	
    
	@OneToMany(fetch=FetchType.EAGER, cascade=CascadeType.REMOVE)
    private Set<OAuthAccount> oAuthAccounts = new HashSet<>();
	public Set<OAuthAccount> getOAuthAccounts() {
		return this.oAuthAccounts;
	}

	@OneToMany(fetch=FetchType.EAGER, cascade=CascadeType.REMOVE)
    @CollectionTable(name="APP_USER_EMAIL_ADDRESS")
    private Set<EmailAddress> emailAddresses = new HashSet<>();
	
	@ManyToMany(targetEntity=Role.class, fetch=FetchType.EAGER)
    @JoinTable( 
        name = "users_roles", 
        joinColumns = @JoinColumn(
          name = "user_id", referencedColumnName = "id"), 
        inverseJoinColumns = @JoinColumn(
          name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles = new HashSet<>();


	@JsonDeserialize
    @Transient
    private String clearTextPassword;

    // ~ Constructors
    // ===================================================================================================

    public SproutUserEntity() {
    }

    public SproutUserEntity(String username, String password, String firstName, String lastName) {
        this(username, password, firstName, lastName, true, true, true, true, new HashSet<Role>());
    }

    /**
     * Calls the more complex constructor with all boolean arguments set to {@code true}.
     */
    public SproutUserEntity(String username, String password, String firstName, String lastName, Set<Role> roles) {
        this(username, password, firstName, lastName, true, true, true, true, roles);
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
     * @param roles the authorities that should be granted to the caller if they
     * presented the correct username and password and the user is enabled. Not null.
     *
     * @throws IllegalArgumentException if a <code>null</code> value was passed either as
     * a parameter or as an element in the <code>GrantedAuthority</code> collection
     */
    public SproutUserEntity(String username, String password, String firstName, String lastName, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Set<Role> roles) {

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
        this.roles = roles;
    }

    // ~ Methods
    // ========================================================================================================

    public void eraseCredentials() {
        password = null;
    }

    private static SortedSet<Privilege> sortAuthorities(Collection<? extends Privilege> authorities) {
        Assert.notNull(authorities, "Cannot pass a null GrantedAuthority collection");
        // Ensure array iteration order is predictable (as per
        // UserDetails.getAuthorities() contract and SEC-717)
        SortedSet<Privilege> sortedAuthorities = new TreeSet<Privilege>(new AuthorityComparator());

        for (Privilege grantedAuthority : authorities) {
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



    // ************************
    // Rich domain methods
    // ************************

    @Transient
    @Override
    @JsonTypeInfo(use = com.fasterxml.jackson.annotation.JsonTypeInfo.Id.NONE)
    public Set<Privilege> getAuthorities() {
        Set<Privilege> privileges = new HashSet<>();
        this.roles.stream().forEach(r -> {
        	r.getPrivileges().forEach(p -> {
        		if (!privileges.contains(p)) {
        			privileges.add(p);
        		}
        	});
        });
        return sortAuthorities(privileges);
    }

    @Transient
    public EmailAddress getPrimaryEmailAddress() {
        Optional<EmailAddress> optionalEmail = this.emailAddresses.stream().filter(e -> e.isPrimary()).findFirst();
        if(optionalEmail.isPresent()) return optionalEmail.get();
        else {
        	return null;
        }
    }

    public void setPrimaryEmailAddress(EmailAddress primaryEmailAddress) {
        primaryEmailAddress.setPrimary(true);
    }

    @Override
	@Transient
    public String getGravatarUrl() {
    	String address = "me@example.com";
    	if (this.getPrimaryEmailAddress() != null) {
    		address = this.getPrimaryEmailAddress().getEmailAddress();
    	}
        return String.format("https://www.gravatar.com/avatar/%s?s=200&d=identicon", MD5Util.md5Hex(address));
    }


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

    public void clearEmailAddresses() {
        this.emailAddresses.clear();
    }

    @Override
	public boolean hasAuthority(String authority) {
        String authorityString = authority.toUpperCase();
        boolean result = this.getAuthorities().stream().anyMatch(r -> r.getAuthority().equals(authorityString));
        return result;
    }
    
    @Transient
    public boolean hasNewPassword(){
        return (this.clearTextPassword != null);
    }

	public void addOAuthAccount(OAuthAccount oauthAccount) {
		this.oAuthAccounts.add(oauthAccount);
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
        if (rhs instanceof SproutUserEntity) {
            return username.equals(((SproutUserEntity) rhs).username);
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

        if (!getAuthorities().isEmpty()) {
            sb.append("Granted Authorities: ");

            boolean first = true;
            for (GrantedAuthority auth : getAuthorities()) {
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

}