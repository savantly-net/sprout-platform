package net.savantly.sprout.module;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.core.module.registration.SproutModuleRegistrationRepository;
import net.savantly.sprout.domain.plugin.PluginConfigurationRepository;
import net.savantly.sprout.domain.plugin.PluginMetaBuilder;

@Configuration
public class ModuleConfiguration {

	private final static Logger log = LoggerFactory.getLogger(ModuleConfiguration.class);

	@Bean
	public PluginService pluginService(PluginMetaBuilder pluginMetaBuilder,
			SproutModuleRegistrationRepository registrationRepository, PluginConfigurationRepository pluginConfigRepo,
			ObjectMapper mapper) {
		return new PluginService(registrationRepository, pluginMetaBuilder, pluginConfigRepo, mapper);
	}

	@Bean
	public PluginMetaBuilder pluginMetaBuilderBean(ResourceLoader resourceLoader,
			PluginConfigurationRepository pluginConfigRepository) {
		return new PluginMetaBuilder(resourceLoader, pluginConfigRepository);
	}

	@Bean
	public ModuleRegistrationService moduleRegistrationService(WebApplicationContext applicationContext,
			PluginMetaBuilder pluginMetaBuilder, SproutModuleRegistrationRepository registrationRepository) {
		ModuleRegistrationService registrationService = new ModuleRegistrationService(applicationContext,
				pluginMetaBuilder, registrationRepository);
		try {
			registrationService.registerKnownModules();
		} catch (Exception e) {
			log.error("failed to register known modules", e);
		}
		return registrationService;
	}

}
