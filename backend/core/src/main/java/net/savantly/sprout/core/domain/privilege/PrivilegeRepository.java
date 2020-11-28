package net.savantly.sprout.core.domain.privilege;

import java.util.List;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RepositoryRestResource
@Repository
public interface PrivilegeRepository extends PersistedDomainObjectRepository<Privilege>{

	List<Privilege> findByName(String name);
}
