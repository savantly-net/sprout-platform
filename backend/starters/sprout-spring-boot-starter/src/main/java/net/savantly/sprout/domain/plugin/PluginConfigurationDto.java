package net.savantly.sprout.domain.plugin;

import java.util.Map;

import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PluginConfigurationDto {

	@Size(max = 64000)
	private Map<String, Object> jsonData;

	@Size(max = 64000)
	private Map<String, Object> secureJsonData;
}
