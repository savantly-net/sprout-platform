package net.savantly.sprout.core.security.privilege;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RepositoryRestResource
@Repository
public interface PrivilegeRepository extends PersistedDomainObjectRepository<Privilege>{

}
