package net.savantly.sprout.core.domain.privilege;

import java.io.Serializable;

import org.springframework.security.core.Authentication;

import net.savantly.sprout.core.security.permissions.Permission;
import net.savantly.sprout.core.security.permissions.SproutPermissionEvaluator;

public class PrivilegePermissionEvaluator implements SproutPermissionEvaluator<Privilege> {
    
    @Override
    public boolean hasPermission(Authentication authentication, Privilege targetDomainObject, Permission permission) {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Permission permission) {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public Class<Privilege> getEvaluationType() {
        return Privilege.class;
    }

}
