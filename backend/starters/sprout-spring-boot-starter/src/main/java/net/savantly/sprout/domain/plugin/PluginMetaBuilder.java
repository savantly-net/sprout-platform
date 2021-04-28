package net.savantly.sprout.domain.plugin;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.core.module.registration.SproutModuleRegistration;
import net.savantly.sprout.core.module.web.plugin.PluginMeta;

public class PluginMetaBuilder {

	private static final Logger log = LoggerFactory.getLogger(PluginMetaBuilder.class);
	private final ResourceLoader resourceLoader;
	private final PluginConfigurationRepository pluginConfigRepository;
	private ObjectMapper mapper = new ObjectMapper();
	
	public PluginMetaBuilder(ResourceLoader resourceLoader, PluginConfigurationRepository pluginConfigRepository) {
		this.resourceLoader = resourceLoader;
		this.pluginConfigRepository = pluginConfigRepository;
	}
	
	public Optional<PluginMeta> buildMeta(SproutModuleRegistration registration) {
		try {
			PluginMeta metaInfo = extractFromPluginJson(registration.getPluginJsonPath());
			return Optional.of(metaInfo);
		} catch (Exception e) {
			log.error("failed to load plugin: " + registration.getId());
			log.error("failed to extract plugin.json information:" + registration, e);
			return Optional.empty();
		}
	}
	
	protected PluginMeta extractFromPluginJson(String resourceLocation) throws IOException {
		PluginMeta pluginMeta = null;
		Resource resource = this.resourceLoader.getResource(resourceLocation);
		if (resource.exists()) {
			pluginMeta = mapper.readValue(resource.getInputStream(), PluginMeta.class);
		} else {
			log.warn("plugin metadata not found: {}", resourceLocation);
			pluginMeta = new PluginMeta();
		}
		PluginConfigurationEntity pluginConfig = getPluginConfiguration(pluginMeta.getId());
		pluginMeta.setBaseUrl("/api/plugins/" + pluginMeta.getId())
			.setDefaultNavUrl("")
			.setModule("/api/plugins/" + pluginMeta.getId() + "/module.js")
			.setEnabled(true)
			.setHasUpdate(false)
			.setJsonData(toMap(pluginConfig.getJsonData()))
			.setSecureJsonData(toMap(pluginConfig.getSecureJsonData()));
		return pluginMeta;
    }
	
	@SuppressWarnings("unchecked")
	private Map<String, Object> toMap(String jsonData) {
		if(Objects.isNull(jsonData) || jsonData.isEmpty()) {
			return new HashMap<String, Object>();
		}
		try {
			return mapper.readValue(jsonData, Map.class);
		} catch (Exception e) {
			log.error("failed to read plugin configuration", e);
			return null;
		}
	}

	private PluginConfigurationEntity getPluginConfiguration(String id) {
		List<PluginConfigurationEntity> list = pluginConfigRepository.findByIdItemId(id);
		if (list.isEmpty()) {
			return new PluginConfigurationEntity();
		} else {
			return list.get(0);
		}
	}
	

}
