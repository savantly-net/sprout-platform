package net.savantly.sprout.module.forms.domain.definition;

import net.savantly.sprout.core.tenancy.TenantedJpaRepository;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;

public interface FormDefinitionRepository extends TenantedJpaRepository<FormDefinition, TenantedPrimaryKey> {

	FormDefinition findByIdItemId(String id);

	void deleteByIdItemId(String id);

}
