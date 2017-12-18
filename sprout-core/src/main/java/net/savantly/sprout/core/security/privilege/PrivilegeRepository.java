package net.savantly.sprout.core.security.privilege;

import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import net.savantly.sprout.core.domain.PersistedDomainObjectRepository;

@RestResource
@Repository
public interface PrivilegeRepository extends PersistedDomainObjectRepository<Privilege>{

}
