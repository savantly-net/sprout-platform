package net.savantly.sprout.domain.plugin;

import java.util.List;

import net.savantly.sprout.core.tenancy.TenantedJpaRepository;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;

public interface PluginConfigurationRepository extends TenantedJpaRepository<PluginConfigurationEntity, TenantedPrimaryKey> {
	
	List<PluginConfigurationEntity> findByIdItemId(String id);

}
