package net.savantly.sprout.module.forms.domain.definition;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import net.savantly.sprout.core.tenancy.TenantedJpaRepository;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;

public interface FormDefinitionRepository extends TenantedJpaRepository<FormDefinition, TenantedPrimaryKey>, JpaSpecificationExecutor<FormDefinition> {

	FormDefinition findByIdItemId(String id);
	List<FormDefinition> findByPath(String id);


	@Transactional
	void deleteByIdItemId(String id);

}
