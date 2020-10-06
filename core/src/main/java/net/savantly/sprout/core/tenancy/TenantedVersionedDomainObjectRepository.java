package net.savantly.sprout.core.tenancy;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import net.savantly.sprout.core.domain.versioning.VersionedId;

@NoRepositoryBean
public interface TenantedVersionedDomainObjectRepository<T extends TenantedVersionedDomainObject> extends JpaRepository<T, VersionedId> {

}
