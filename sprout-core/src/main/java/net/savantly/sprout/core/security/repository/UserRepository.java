package net.savantly.sprout.core.security.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import net.savantly.sprout.core.security.SproutUser;

@RepositoryRestResource(path="users", collectionResourceRel="users")
public interface UserRepository extends PagingAndSortingRepository<SproutUser, String> {

	ProfileProjection findProfileFirstByUsername(String username);
	ProfileProjection findProfileById(String id);
	SproutUser findOneByUsername(String username);
	SproutUser findByPrimaryEmailAddress_EmailAddress(String emailAddress);
}
