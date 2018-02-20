package net.savantly.sprout.core.security.privilege;

import java.io.Serializable;

import org.springframework.security.core.Authentication;

import net.savantly.sprout.core.security.Permission;
import net.savantly.sprout.core.security.SproutPermissionEvaluator;

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
