package net.savantly.sprout.domain.file.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import net.savantly.sprout.core.tenancy.TenantedJpaRepository;

public interface JpaFileRepository extends TenantedJpaRepository<JpaFile, String> {

	List<JpaFileSummary> findByParent(String path);
	
	@Query("SELECT COUNT(f) FROM JpaFile f WHERE f.parent=:parent")
	long countByParent(@Param("parent") String parent);
}
