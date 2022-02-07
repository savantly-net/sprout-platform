package net.savantly.sprout.core.domain.user;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;

import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.core.domain.emailAddress.EmailAddress;
import net.savantly.sprout.core.domain.organization.Organization;
import net.savantly.sprout.core.domain.privilege.PrivilegeDto;
import net.savantly.sprout.core.domain.role.Role;
import net.savantly.sprout.core.domain.role.RoleDto;

@Accessors(chain = true)
@Setter
public class SproutUserDto implements SproutUser {

    private String uuid;
    private List<PrivilegeDto> authorities = new ArrayList<>();
    private String username;
    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private boolean enabled;
    private String displayName;
    private Set<EmailAddress> emailAddresses = new HashSet<>();
    private EmailAddress primaryEmailAddress;
    private boolean hidePrimaryEmailAddress;
    private String firstName;
    private String lastName;
    private String gravatarUrl;
    private Set<RoleDto> roles;
    private String phoneNumber;

    @Override
    public String getUuid() {
        return uuid;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return "[HIDDEN]";
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public String getDisplayName() {
        return displayName;
    }

    @Override
    public Set<EmailAddress> getEmailAddresses() {
        return emailAddresses;
    }

    @Override
    public EmailAddress getPrimaryEmailAddress() {
        return primaryEmailAddress;
    }

    @Override
    public boolean isHidePrimaryEmailAddress() {
        return hidePrimaryEmailAddress;
    }

    @Override
    public String getFirstName() {
        return firstName;
    }

    @Override
    public String getLastName() {
        return lastName;
    }

    @Override
    public String getGravatarUrl() {
        return gravatarUrl;
    }

    @Override
    public Organization getOrganization() {
        return null;
    }

    @Override
    public boolean hasAuthority(String authority) {
        String authorityString = authority.toUpperCase();
        boolean result = this.getAuthorities().stream().anyMatch(r -> r.getAuthority().equals(authorityString));
        return result;
    }

    @Override
    public String getPhoneNumber() {
        return phoneNumber;
    }

    @Override
    public Set<? extends Role> getRoles() {
        return roles;
    }

}