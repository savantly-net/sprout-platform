package net.savantly.sprout.core.domain.versioning;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface TenantedVersionedDomainObjectRepository<T extends TenantedVersionedDomainObject> extends JpaRepository<T, VersionedId> {

}
