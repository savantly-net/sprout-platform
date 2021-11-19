package net.savantly.sprout.core.domain.role;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(excerptProjection=DefaultRoleProjection.class)
public interface RoleRepository extends CrudRepository<Role, String>{
	
	List<Role> findByName(String name);

	@Query("SELECT r FROM APP_ROLE r WHERE r.name = :name")
	List<DefaultRoleProjection> includePrivilegesByName(@Param("name") String name);

	@Query("SELECT r FROM APP_ROLE r WHERE r.id = :id")
	DefaultRoleProjection includePrivilegesById(@Param("id") String id);
}
