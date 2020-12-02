package net.savantly.sprout.data.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.repository.NoRepositoryBean;

import net.savantly.sprout.core.domain.tenant.TenantSupport;
import net.savantly.sprout.core.tenancy.TenantedJpaRepository;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;

@NoRepositoryBean
public interface TenantKeyedRepository<T extends TenantSupport> extends TenantedJpaRepository<T, TenantedPrimaryKey> {

	Optional<T> findByIdItemId(String itemId);
	
	@Transactional
	void deleteByIdItemId(String itemId);
}
