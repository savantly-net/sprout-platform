package net.savantly.sprout.domain.plugin;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity(name = "PLUGIN_CONFIGURATION")
@Getter @Setter
public class PluginConfigurationEntity extends PersistedDomainObject {

	@Size(max = 64000)
	@Column(length = 64000)
	private String jsonData;

	@Size(max = 64000)
	@Column(length = 64000)
	private String secureJsonData;
}
