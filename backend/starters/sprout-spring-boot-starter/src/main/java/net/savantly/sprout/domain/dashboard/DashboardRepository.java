package net.savantly.sprout.domain.dashboard;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import net.savantly.sprout.core.tenancy.TenantedVersionedDomainObjectRepository;
import net.savantly.sprout.domain.dashboard.projection.DashboardSummary;

public interface DashboardRepository extends TenantedVersionedDomainObjectRepository<Dashboard> {
	List<Dashboard> findByIdId(String id);

	List<Dashboard> findByFolder(String id);

	@Query(value = "SELECT d FROM Dashboard d")
	List<DashboardSummary> getLatestSummary();
}
