package net.savantly.sprout.domain.dashboard;

import java.util.List;

import net.savantly.sprout.core.domain.versioning.TenantedVersionedDomainObjectRepository;

public interface DashboardRepository extends TenantedVersionedDomainObjectRepository<Dashboard> {

	Dashboard findOneByUid(String uuid);
	List<Dashboard> findById(Long id);
}
