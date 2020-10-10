package net.savantly.sprout.core.module.web.plugin;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class PluginInclude {

	private PluginIncludeType type;
	private String name;
	private String path;
	private String icon;

	private String role; // "Viewer", Admin, editor???
	private boolean addToNav;
}
