package net.savantly.sprout.core.security.role;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

import net.savantly.sprout.core.security.privilege.Privilege;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;

@Projection(types=Role.class)
public interface DefaultRoleProjection {

	TenantedPrimaryKey getId();
	String getName();
	Set<Privilege> getPrivileges();

}