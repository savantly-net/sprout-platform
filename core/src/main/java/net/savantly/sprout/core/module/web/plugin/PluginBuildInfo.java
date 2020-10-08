package net.savantly.sprout.core.module.web.plugin;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
public class PluginBuildInfo {
	private long time;
	private String repo;
	private String branch;
	private String hash;
	private long number;
	private long pr;
}
