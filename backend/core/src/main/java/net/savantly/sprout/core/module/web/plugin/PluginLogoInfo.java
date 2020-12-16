package net.savantly.sprout.core.module.web.plugin;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
public class PluginLogoInfo {

	private String large;
	private String small;
	private String icon;
}
