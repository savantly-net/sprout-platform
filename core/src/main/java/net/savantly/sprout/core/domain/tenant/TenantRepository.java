package net.savantly.sprout.core.domain.tenant;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path="tenants", collectionResourceRel="tenants")
public interface TenantRepository extends PagingAndSortingRepository<TenantEntity, String> {

	Tenant findOneByAliases(String alias);
}
