package net.savantly.sprout.domain.dashboard;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;

import net.savantly.sprout.core.domain.versioning.StringVersionedId;

import net.savantly.sprout.core.tenancy.TenantedVersionedDomainObjectRepository;
import net.savantly.sprout.domain.dashboard.projection.DashboardSummary;

public interface DashboardRepository extends TenantedVersionedDomainObjectRepository<Dashboard> {
	List<Dashboard> findByIdId(String id);

	List<Dashboard> findByFolder(String id);

	@Query(value = "SELECT d FROM Dashboard d")
	List<DashboardSummary> getLatestSummary();

	@Modifying
	@Transactional
	@Query("update Dashboard d set d.currentVersion = ?1 where d.id = ?2")
	void setCurrentVersionForId(Boolean currentVersion, StringVersionedId id);
}
