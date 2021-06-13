package net.savantly.sprout.core.module.registration;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import net.savantly.sprout.core.module.web.plugin.PluginType;

@Entity
@Getter @Setter
@Table(name = "sprout_module_registration")
public class SproutModuleRegistration {

    @Id
    @Size(max = 100)
    @Column(length = 100)
	private String id;
	private String name;
	private String description;
	@Column(name = "version")
	private String version;
	private boolean isPlugin;
	private PluginType pluginType;
	
	private String beanName;
}
