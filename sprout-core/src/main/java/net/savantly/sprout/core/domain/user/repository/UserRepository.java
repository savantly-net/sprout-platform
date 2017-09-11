package net.savantly.sprout.core.domain.user.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import net.savantly.sprout.core.domain.user.SproutUser;

@Repository
@RepositoryRestResource(path="users", collectionResourceRel="users")
public interface UserRepository extends PagingAndSortingRepository<SproutUser, String>, UserRepositoryCustom {

	ProfileProjection findProfileFirstByUsername(String username);
	ProfileProjection findProfileById(String id);
	SproutUser findOneByUsername(String username);
	SproutUser findByPrimaryEmailAddress_EmailAddress(String emailAddress);
}
