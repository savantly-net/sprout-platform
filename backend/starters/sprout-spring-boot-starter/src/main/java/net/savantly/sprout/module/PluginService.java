package net.savantly.sprout.module;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.core.module.registration.SproutModuleRegistration;
import net.savantly.sprout.core.module.registration.SproutModuleRegistrationRepository;
import net.savantly.sprout.core.module.web.plugin.PluginMeta;
import net.savantly.sprout.core.module.web.plugin.PluginType;
import net.savantly.sprout.core.tenancy.TenantedPrimaryKey;
import net.savantly.sprout.domain.plugin.PluginConfigurationDto;
import net.savantly.sprout.domain.plugin.PluginConfigurationEntity;
import net.savantly.sprout.domain.plugin.PluginConfigurationRepository;
import net.savantly.sprout.domain.plugin.PluginMetaBuilder;

public class PluginService {

	private static final Logger log = LoggerFactory.getLogger(PluginService.class);
	private final SproutModuleRegistrationRepository registrationRepository;
	private final PluginMetaBuilder pluginMetaBuilder;
	private final PluginConfigurationRepository pluginConfigRepository;
	private final ObjectMapper mapper;

	public PluginService(
			SproutModuleRegistrationRepository registrationRepository, 
			PluginMetaBuilder pluginMetaBuilder,
			PluginConfigurationRepository pluginConfigRepository, 
			ObjectMapper mapper) {
		this.pluginMetaBuilder = pluginMetaBuilder;
		this.registrationRepository = registrationRepository;
		this.pluginConfigRepository = pluginConfigRepository;
		this.mapper = mapper;
	}
	
	public List<PluginMeta> getAllPlugins(){
		return this.registrationRepository.findAllByIsPlugin(true).stream().map(p -> {
			Optional<PluginMeta> opt = pluginMetaBuilder.buildMeta(p);
			return opt.isPresent() ? opt.get() : null;
		}).filter(p -> Objects.nonNull(p)).collect(Collectors.toList());
	}
	
	public List<PluginMeta> getAppPlugins(){
		return this.registrationRepository.findAllByIsPlugin(true).stream()
				.filter(p -> p.getPluginType().equals(PluginType.app)).map(p -> {
			Optional<PluginMeta> opt = pluginMetaBuilder.buildMeta(p);
			return opt.isPresent() ? opt.get() : null;
		}).filter(p -> Objects.nonNull(p)).collect(Collectors.toList());
	}
	
	public List<PluginMeta> getPanelPlugins(){
		return this.registrationRepository.findAllByIsPlugin(true).stream()
				.filter(p -> p.getPluginType().equals(PluginType.panel)).map(p -> {
			Optional<PluginMeta> opt = pluginMetaBuilder.buildMeta(p);
			return opt.isPresent() ? opt.get() : null;
		}).filter(p -> Objects.nonNull(p)).collect(Collectors.toList());
	}
	
	public PluginMeta getPluginMetaByPluginId(String id) {
		Optional<SproutModuleRegistration> opt = this.registrationRepository.findById(id);
		if (opt.isPresent()) {
			Optional<PluginMeta> optMeta = this.pluginMetaBuilder.buildMeta(opt.get());
			if (optMeta.isPresent()) {
				return optMeta.get();
			}
		}
		throw new PluginException("failed to get plugin meta info");
	}
	
	public PluginConfigurationDto updatePluginConfiguration(String pluginId, PluginConfigurationDto dto) throws JsonProcessingException {
		PluginConfigurationEntity entity = getPluginConfiguration(pluginId);
		String jsonData = mapper.writeValueAsString(dto.getJsonData());
		entity.setJsonData(jsonData);
		pluginConfigRepository.save(entity);
		return dto;
	}

	// TODO: Implement reading a markdown file from the module lib
	// Maybe need to unpack the plugins/modules into a temp folder 
	public String getPluginMarkdownByPluginId(String id, String markdownType) {
		return "# Not Implemented Yet  \nTODO: Implement reading a markdown file from the module lib  \nMaybe need to unpack the plugins/modules into a temp folder";
	}
	
	private PluginConfigurationEntity getPluginConfiguration(String id) {
		List<PluginConfigurationEntity> list = pluginConfigRepository.findByIdItemId(id);
		if (list.isEmpty()) {
			PluginConfigurationEntity entity = new PluginConfigurationEntity();
			TenantedPrimaryKey key = new TenantedPrimaryKey();
			key.setItemId(id);
			entity.setId(key);
			return entity;
		} else {
			return list.get(0);
		}
	}
}
