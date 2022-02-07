package net.savantly.sprout.core.domain.role;

import java.util.Set;

import org.springframework.security.core.GrantedAuthority;

public interface Role {
    
    String getName();
    Set<? extends GrantedAuthority> getPrivileges();
}
