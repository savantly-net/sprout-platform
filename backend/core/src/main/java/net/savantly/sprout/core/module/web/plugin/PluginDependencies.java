package net.savantly.sprout.core.module.web.plugin;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
public class PluginDependencies {
	private String sproutVersion;
	private List<PluginDependencyInfo> plugins;
}
