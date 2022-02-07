package net.savantly.sprout.core.domain.privilege;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;

import net.savantly.sprout.core.security.permissions.Permission;
import net.savantly.sprout.core.security.permissions.SproutPermissionEvaluator;

public class PrivilegePermissionEvaluator implements SproutPermissionEvaluator<PrivilegeEntity> {
    
    @Override
    public boolean hasPermission(Authentication authentication, PrivilegeEntity targetDomainObject, Permission permission) {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Permission permission) {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public List<String> getEvaluationType() {
		List<String> list = new ArrayList<>();
		list.add(PrivilegeEntity.class.getName());
		list.add(PrivilegeEntity.class.getName() + ".ID");
		return list;
	}

}
