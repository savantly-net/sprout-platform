package net.savantly.sprout.core.module.web.plugin;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class PluginMetaInfo {
	private PluginAuthor author;
	private String description;
	private List<PluginMetaInfoLink> links;
	private PluginLogoInfo logos;
	private PluginBuildInfo build;
	private List<PluginScreenshotInfo> screenshots;
	private String updated;
	private String version;
}
