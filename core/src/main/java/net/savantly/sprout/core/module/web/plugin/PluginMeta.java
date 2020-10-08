package net.savantly.sprout.core.module.web.plugin;

import java.util.Map;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
@Builder
public class PluginMeta {

	private String id;
	private String name;
	private PluginType type;
	private PluginMetaInfo info;
	private PluginInclude includes[];
	private PluginState state;

	// System.load & relative URLS
	private String module;
	private String baseUrl;

	// Define plugin requirements
	private PluginDependencies dependencies;

	// Filled in by the backend
	private Map<String, Object> jsonData;
	private Map<String, Object> secureJsonData;
	private boolean enabled;
	private String defaultNavUrl;
	private boolean hasUpdate;
	private boolean enterprise;
	private String latestVersion;
	private boolean pinned;
	private PluginSignatureStatus signature;
}
