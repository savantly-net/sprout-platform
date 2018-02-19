package net.savantly.sprout.core.domain.tenant;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface TenantRepository extends PagingAndSortingRepository<TenantEntity, String> {

	Tenant findOneByAliases(String alias);
}
