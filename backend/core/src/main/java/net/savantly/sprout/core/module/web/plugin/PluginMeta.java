package net.savantly.sprout.core.module.web.plugin;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class PluginMeta {

	private String id;
	private boolean preload;
	private String name;
	private PluginType type = PluginType.panel;
	private PluginMetaInfo info;
	private PluginInclude includes[];
	private PluginState state = PluginState.alpha;

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
