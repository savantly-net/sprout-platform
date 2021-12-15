package net.savantly.sprout.core.domain.privilege;

import org.springframework.security.core.GrantedAuthority;

import lombok.Data;

@Data
public class PrivilegeDto implements GrantedAuthority {
    
    private String authority;
}
