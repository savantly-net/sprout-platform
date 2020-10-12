package net.savantly.sprout.module;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.savantly.sprout.core.module.registration.SproutModuleRegistration;
import net.savantly.sprout.core.module.registration.SproutModuleRegistrationRepository;
import net.savantly.sprout.core.module.web.plugin.PluginMeta;
import net.savantly.sprout.core.module.web.plugin.PluginType;
import net.savantly.sprout.domain.plugin.PluginMetaBuilder;

public class PluginService {

	private static final Logger log = LoggerFactory.getLogger(PluginService.class);
	private SproutModuleRegistrationRepository registrationRepository;
	private PluginMetaBuilder pluginMetaBuilder;

	public PluginService(
			SproutModuleRegistrationRepository registrationRepository, 
			PluginMetaBuilder pluginMetaBuilder) {
		this.pluginMetaBuilder = pluginMetaBuilder;
		this.registrationRepository = registrationRepository;
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
}
