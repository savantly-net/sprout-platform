package net.savantly.sprout.module;

import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.WebApplicationContext;

import net.savantly.sprout.core.module.SproutModule;
import net.savantly.sprout.core.module.SproutWebModule;
import net.savantly.sprout.core.module.registration.SproutModuleRegistration;
import net.savantly.sprout.core.module.registration.SproutModuleRegistrationRepository;
import net.savantly.sprout.core.module.web.plugin.PluginMeta;
import net.savantly.sprout.domain.plugin.PluginMetaBuilder;

public class ModuleRegistrationService {

	private static final Logger log = LoggerFactory.getLogger(ModuleRegistrationService.class);

	private WebApplicationContext applicationContext;
	private PluginMetaBuilder pluginMetaBuilder;
	private SproutModuleRegistrationRepository registrationRepository;
	
	public ModuleRegistrationService(
			WebApplicationContext applicationContext,
			PluginMetaBuilder pluginMetaBuilder,
			SproutModuleRegistrationRepository registrationRepository) {
		this.applicationContext = applicationContext;
		this.pluginMetaBuilder = pluginMetaBuilder;
		this.registrationRepository = registrationRepository;
	}
	
	public void registerKnownModules() throws Exception {
		Map<String, SproutModule> beans = applicationContext.getBeansOfType(SproutModule.class);
		log.info("module beans: {}", beans);
		
		for (Entry<String, SproutModule> entry : beans.entrySet()) {
			ensureRegistration(entry);
		}
	}

	private void ensureRegistration(Entry<String, SproutModule> entry) {
		SproutModuleRegistration item = registrationRepository.findById(entry.getKey())
				.orElse(new SproutModuleRegistration());

		item.setEnabled(true);
		item.setId(entry.getValue().getId());
		item.setName(entry.getValue().getName());
		item.setDescription(entry.getValue().getDescription());
		item.setVersion(entry.getValue().getVersion());
		
		if (SproutWebModule.class.isAssignableFrom(entry.getValue().getClass())) {
			SproutWebModule plugin = ((SproutWebModule)entry.getValue());
			item.setPluginJsonPath(plugin.getPluginJsonPath());
			Optional<PluginMeta> pluginMeta = pluginMetaBuilder.buildMeta(item);
			if(pluginMeta.isPresent()) {
				item.setPlugin(true);
				item.setPluginType(pluginMeta.get().getType());
			} else {
				log.error("failed to register plugin. check error logs. " + item.getId());
			}
		}

		registrationRepository.save(item);
	}
}
