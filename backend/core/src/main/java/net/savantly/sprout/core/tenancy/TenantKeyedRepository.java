package net.savantly.sprout.core.tenancy;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.repository.NoRepositoryBean;

import net.savantly.sprout.core.domain.tenant.TenantSupport;

@NoRepositoryBean
public interface TenantKeyedRepository<T extends TenantSupport> extends TenantedJpaRepository<T, TenantedPrimaryKey> {

	Optional<T> findByIdItemId(String itemId);
	
	@Transactional
	void deleteByIdItemId(String itemId);
}
