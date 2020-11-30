package net.savantly.sprout.core.module.web.plugin;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class PluginInclude {

	private PluginIncludeType type;
	private String name;
	private String path;
	private String icon;

	private String role; // "Viewer", Admin, editor???
	private String defaultNav;
	private boolean addToNav;
	private List<PluginInclude> children = new ArrayList<>();
}
