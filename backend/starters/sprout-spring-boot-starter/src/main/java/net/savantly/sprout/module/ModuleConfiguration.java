package net.savantly.sprout.module;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.core.module.registration.SproutModuleRegistrationRepository;
import net.savantly.sprout.domain.plugin.PluginConfigurationRepository;

@Configuration
public class ModuleConfiguration {

	private final static Logger log = LoggerFactory.getLogger(ModuleConfiguration.class);

	@Bean
	public PluginService pluginService(SproutModuleRegistrationRepository registrationRepository, PluginConfigurationRepository pluginConfigRepo,
			ObjectMapper mapper, ApplicationContext context) {
		return new PluginService(context, registrationRepository, pluginConfigRepo, mapper);
	}

	@Bean
	public ModuleRegistrationService moduleRegistrationService(WebApplicationContext applicationContext,
			SproutModuleRegistrationRepository registrationRepository) {
		ModuleRegistrationService registrationService = new ModuleRegistrationService(applicationContext, registrationRepository);
		try {
			registrationService.registerKnownModules();
		} catch (Exception e) {
			log.error("failed to register known modules", e);
		}
		return registrationService;
	}

}
