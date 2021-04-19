package net.savantly.sprout.core.security.permissions;

import java.io.Serializable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.util.Assert;


public class DelegatingPermissionEvaluator implements PermissionEvaluator {
    
    private static final Logger log = LoggerFactory.getLogger(DelegatingPermissionEvaluator.class);

    private SproutPermissionRegistry registry;

    public DelegatingPermissionEvaluator(SproutPermissionRegistry registry) {
        this.registry = registry;
    }
    
    public boolean hasPermission(Authentication authentication, Object permission){
        throw new RuntimeException("Only call this method with an entity parameter.");
    }

    @SuppressWarnings({ "unchecked"})
    @Override
    public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
    	Assert.notNull(targetDomainObject, "the targetDomainObject is required");
        String type = targetDomainObject.getClass().getName();
        if (registry.containsPermissionEvaluator(type)) {
            Permission permissionItem = getPermissionItem(permission);
            return registry.getPermissionEvaluator(type).hasPermission(authentication, targetDomainObject, permissionItem);
        } else {
            return true;
        }
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Object permission) {
        if (registry.containsPermissionEvaluator(targetType)) {
            try {
                Permission permissionItem = getPermissionItem(permission);
                return registry.getPermissionEvaluator(targetType).hasPermission(authentication, targetId, targetType, permissionItem);
            } catch (Exception e) {
                log.error("{}", e);
                return false;
            }
        } else {
            return true;
        }
    }
    
    private Permission getPermissionItem(Object permission) {
        try{
            Permission permissionItem = Permission.valueOf(permission.toString());
            return permissionItem;
        } catch(Exception ex){
            log.error(ex.getMessage());
            throw new RuntimeException(String.format("Invalid permission: %s", permission));
		}

	}

}
