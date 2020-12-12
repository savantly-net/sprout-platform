package net.savantly.sprout.domain.file.jpa;

import java.util.List;

import net.savantly.sprout.core.tenancy.TenantedJpaRepository;

public interface JpaFileRepository extends TenantedJpaRepository<JpaFile, String> {

	List<JpaFileSummary> findByPath(String path);
}
