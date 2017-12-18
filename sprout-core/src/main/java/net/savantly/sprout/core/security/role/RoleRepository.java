package net.savantly.sprout.core.security.role;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@Repository
@RepositoryRestResource(excerptProjection=DefaultRoleProjection.class)
public interface RoleRepository extends PersistedDomainObjectRepository<Role>{

	@Query("SELECT r FROM Role r WHERE r.id = :id")
	DefaultRoleProjection includePrivileges(@Param("id") String id);
}
