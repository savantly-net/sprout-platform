package net.savantly.sprout.core.security.role;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

import net.savantly.sprout.core.security.privilege.Privilege;

@Projection(types=Role.class)
public interface DefaultRoleProjection {

	String getId();
	Set<Privilege> getPrivileges();

}