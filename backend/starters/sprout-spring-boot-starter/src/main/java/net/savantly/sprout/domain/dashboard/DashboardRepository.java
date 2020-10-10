package net.savantly.sprout.domain.dashboard;

import java.util.List;

import net.savantly.sprout.core.tenancy.TenantedVersionedDomainObjectRepository;

public interface DashboardRepository extends TenantedVersionedDomainObjectRepository<Dashboard> {
	List<Dashboard> findByIdId(String id);
}
