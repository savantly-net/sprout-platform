package net.savantly.sprout.core.module.registration;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;
import net.savantly.sprout.core.module.web.plugin.PluginType;

@Entity
@Getter @Setter
public class SproutModuleRegistration {

    @Id
    @Column(columnDefinition = "CHAR(100)")
	private String id;
	private String name;
	private String description;
	private String version;
	private boolean enabled;
	private boolean installed;
	private boolean isPlugin;
	private String pluginJsonPath;
	private PluginType pluginType;
}
