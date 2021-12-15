package net.savantly.sprout.core.domain.role;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

import net.savantly.sprout.core.domain.privilege.PrivilegeEntity;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;

@Projection(types=RoleEntity.class)
public interface DefaultRoleProjection {

	TenantedPrimaryKey getId();
	String getName();
	Set<PrivilegeEntity> getPrivileges();

}