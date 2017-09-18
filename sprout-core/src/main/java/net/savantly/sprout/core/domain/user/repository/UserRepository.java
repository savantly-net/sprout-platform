package net.savantly.sprout.core.domain.user.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import net.savantly.sprout.core.domain.user.SproutUser;
import net.savantly.sprout.core.domain.user.SproutUserEntity;

@Repository
@RepositoryRestResource(path="users", collectionResourceRel="users")
public interface UserRepository extends PagingAndSortingRepository<SproutUserEntity, String>, UserRepositoryCustom {

	ProfileProjection findProfileFirstByUsername(String username);
	ProfileProjection findProfileById(String id);
	SproutUserEntity findOneByUsername(String username);
	SproutUser findByPrimaryEmailAddress_EmailAddress(String emailAddress);
}
