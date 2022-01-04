package net.savantly.sprout.module;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.core.module.SproutWebModule;
import net.savantly.sprout.core.module.registration.SproutModuleRegistration;
import net.savantly.sprout.core.module.registration.SproutModuleRegistrationRepository;
import net.savantly.sprout.core.module.web.plugin.PluginMeta;
import net.savantly.sprout.core.module.web.plugin.PluginType;
import net.savantly.sprout.domain.plugin.PluginConfigurationDto;
import net.savantly.sprout.domain.plugin.PluginConfigurationEntity;
import net.savantly.sprout.domain.plugin.PluginConfigurationRepository;

public class PluginService {

	private static final Logger log = LoggerFactory.getLogger(PluginService.class);
	private final ApplicationContext context;
	private final SproutModuleRegistrationRepository registrationRepository;
	private final PluginConfigurationRepository pluginConfigRepository;
	private final ObjectMapper mapper;

	public PluginService(
			ApplicationContext context,
			SproutModuleRegistrationRepository registrationRepository,
			PluginConfigurationRepository pluginConfigRepository,
			ObjectMapper mapper) {
		this.context = context;
		this.registrationRepository = registrationRepository;
		this.pluginConfigRepository = pluginConfigRepository;
		this.mapper = mapper;
	}

	public List<PluginMeta> getAllPlugins(){
		return this.registrationRepository.findAllByIsPlugin(true).stream().map(p -> {
			Optional<PluginMeta> opt = getPluginMeta(p.getId());
			return opt.isPresent() ? opt.get() : null;
		}).filter(p -> Objects.nonNull(p)).collect(Collectors.toList());
	}

	public List<PluginMeta> getAppPlugins(){
		return this.registrationRepository.findAllByIsPlugin(true).stream()
				.filter(p -> p.getPluginType().equals(PluginType.app)).map(p -> {
					Optional<PluginMeta> opt = this.getPluginMeta(p.getId());
					return opt.isPresent() ? opt.get() : null;
				}).filter(p -> Objects.nonNull(p)).collect(Collectors.toList());
	}

	public List<PluginMeta> getPanelPlugins(){
		return this.registrationRepository.findAllByIsPlugin(true).stream()
				.filter(p -> p.getPluginType().equals(PluginType.panel)).map(p -> {
					Optional<PluginMeta> opt = this.getPluginMeta(p.getId());
					return opt.isPresent() ? opt.get() : null;
				}).filter(p -> Objects.nonNull(p)).collect(Collectors.toList());
	}

	public PluginMeta getPluginMetaByPluginId(String id) {
		Optional<SproutModuleRegistration> opt = this.registrationRepository.findById(id);
		if (opt.isPresent()) {
			Optional<PluginMeta> optMeta = this.getPluginMeta(id);
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

	// TODO: might need to have multiple types of docs to return
	public String getPluginMarkdownByPluginId(String id, String markdownType) {
		Optional<SproutWebModule> m = getSproutWebModule(id);
		if (m.isPresent()) {
			return m.get().getPluginInformationContent();
		} else {
			return "<h1>id</h1><p>No information avaiable.</p>";
		}
	}

	private Optional<PluginMeta> getPluginMeta(String id) {
		Optional<SproutWebModule> m = getSproutWebModule(id);
		if (m.isPresent()) {
			PluginMeta pluginMeta = m.get().getPluginMeta();
			PluginConfigurationEntity pluginConfig = getPluginConfiguration(id);
			if (Objects.nonNull(pluginConfig) && Objects.nonNull(pluginConfig.getJsonData())) {
				try {
					pluginMeta.setJsonData(mapper.readerForMapOf(String.class).readValue(pluginConfig.getJsonData()));
				} catch (JsonProcessingException e) {
					log.error("failed to read plugin configuration jsonData. check the value stored in the database.", e);
				}
			}

			return Optional.of(pluginMeta);
		}
		return Optional.empty();
	}

	private Optional<SproutWebModule> getSproutWebModule(String id) {
		Optional<SproutModuleRegistration> registration = this.registrationRepository.findById(id);

		if(registration.isPresent() && this.context.containsBean(registration.get().getBeanName())) {
			Object bean = this.context.getBean(registration.get().getBeanName());
			if (SproutWebModule.class.isAssignableFrom(bean.getClass())) {
				return Optional.ofNullable(((SproutWebModule) bean));
			} else {
				log.error("the bean is not a SproutWebModule, id: %s, beanName: %s", id, registration.get().getBeanName());
			}
		}
		return Optional.empty();
	}

	private PluginConfigurationEntity getPluginConfiguration(String id) {
//		List<PluginConfigurationEntity> list = pluginConfigRepository.findByIdItemId(id);
		PluginConfigurationEntity list = pluginConfigRepository.findById(id).orElse(new PluginConfigurationEntity());
		if (list == null) {
			PluginConfigurationEntity entity = new PluginConfigurationEntity();
			/*TenantedPrimaryKey key = new TenantedPrimaryKey();
			key.setItemId(id);
			entity.setId(key);
			*/
			entity.setId(id);
			return entity;
		} else {
			return list;
		}
	}
}
