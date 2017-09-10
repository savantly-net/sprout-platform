package net.savantly.sprout.core.security;

import java.io.Serializable;

import org.springframework.security.core.Authentication;

public interface SproutPermissionEvaluator<T> {
    
    Class<T> getEvaluationType();

    boolean hasPermission(Authentication authentication, T targetDomainObject, Permission permission);

    boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Permission permission);

}
