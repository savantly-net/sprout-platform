package net.savantly.sprout.module.forms.domain.data;

import net.savantly.sprout.core.tenancy.TenantedJpaRepository;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;

public interface FormDataRepository extends TenantedJpaRepository<FormData, TenantedPrimaryKey> {

	FormData findByIdItemId(String id);

	void deleteByIdItemId(String id);

}
