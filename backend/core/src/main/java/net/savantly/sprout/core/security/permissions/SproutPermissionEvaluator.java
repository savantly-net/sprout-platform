package net.savantly.sprout.core.security.permissions;

import java.io.Serializable;
import java.util.List;

import org.springframework.security.core.Authentication;

public interface SproutPermissionEvaluator<T> {
    
	/**
	 * A list of fully qualified types this evaluator supports.  <br>
	 * ex. com.example.Foo
	 * @return
	 */
    List<String> getEvaluationType();

    boolean hasPermission(Authentication authentication, T targetDomainObject, Permission permission);

    boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Permission permission);

}
