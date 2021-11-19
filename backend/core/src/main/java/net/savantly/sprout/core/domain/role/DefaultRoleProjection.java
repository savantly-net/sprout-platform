package net.savantly.sprout.core.domain.role;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

import net.savantly.sprout.core.domain.privilege.Privilege;

@Projection(types=Role.class)
public interface DefaultRoleProjection {

	String getName();
	Set<Privilege> getPrivileges();

}