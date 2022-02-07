package net.savantly.sprout.core.domain.user.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.SproutUserEntity;
import net.savantly.sprout.core.tenancy.TenantedJpaRepository;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;

@Repository
@RepositoryRestResource(path="users", collectionResourceRel="users")
public interface UserRepository extends TenantedJpaRepository<SproutUserEntity, TenantedPrimaryKey>, CrudRepository<SproutUserEntity, TenantedPrimaryKey> {

	ProfileProjection findProfileFirstByUsername(String username);
	ProfileProjection findProfileById(String id);
	SproutUserEntity findOneByUsername(String username);
	SproutUserEntity findOneById_ItemId(String itemId);
	SproutUser findByEmailAddresses_EmailAddress(String emailAddress);
	
	@Query("SELECT u FROM SproutUserEntity u where u.id = :id")
	DefaultUserProjection getFullDetailsById(@Param("id") String id);
	@Query("SELECT u FROM SproutUserEntity u where u.username = :username")
	DefaultUserProjection getFullDetailsByUsername(@Param("username") String username);
}
