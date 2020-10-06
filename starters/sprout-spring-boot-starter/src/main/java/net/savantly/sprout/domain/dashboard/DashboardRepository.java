package net.savantly.sprout.domain.dashboard;

import java.util.List;

import net.savantly.sprout.core.tenancy.TenantedVersionedDomainObjectRepository;

public interface DashboardRepository extends TenantedVersionedDomainObjectRepository<Dashboard> {

	Dashboard findOneByUid(String uuid);
	List<Dashboard> findById(Long id);
}
