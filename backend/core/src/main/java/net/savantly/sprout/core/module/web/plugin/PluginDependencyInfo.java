package net.savantly.sprout.core.module.web.plugin;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
public class PluginDependencyInfo {
	private String id;
	private String name;
	private String version;
	private PluginType type;
}
