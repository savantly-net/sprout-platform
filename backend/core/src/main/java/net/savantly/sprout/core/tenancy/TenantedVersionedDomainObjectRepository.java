package net.savantly.sprout.core.tenancy;

import org.springframework.data.repository.NoRepositoryBean;

import net.savantly.sprout.core.domain.versioning.VersionedDomainObjectRepository;

@NoRepositoryBean
public interface TenantedVersionedDomainObjectRepository<T extends TenantedVersionedDomainObject> extends VersionedDomainObjectRepository<T> {

}
