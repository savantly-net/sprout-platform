package net.savantly.sprout.module.forms.domain.data;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import net.savantly.sprout.core.tenancy.TenantedJpaRepository;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;

public interface FormDataRepository extends TenantedJpaRepository<FormData, TenantedPrimaryKey> {

	FormData findByIdItemId(String id);
	Page<FormData> findByFormDefinitionId(String formDefinitionId, Pageable page);

	void deleteByIdItemId(String id);

}
