package net.savantly.sprout.domain.plugin;

import javax.persistence.Entity;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import net.savantly.sprout.core.tenancy.TenantKeyedEntity;

@Entity
@Getter @Setter
public class PluginConfigurationEntity extends TenantKeyedEntity {

	@Size(max = 64000)
	private String jsonData;

	@Size(max = 64000)
	private String secureJsonData;
}
