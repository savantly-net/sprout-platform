package net.savantly.sprout.module;

import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.web.context.WebApplicationContext;

import net.savantly.sprout.controllers.PluginsController;
import net.savantly.sprout.core.module.SproutModule;
import net.savantly.sprout.core.module.registration.SproutModuleRegistration;
import net.savantly.sprout.core.module.registration.SproutModuleRegistrationRepository;

@Configuration
@DependsOn({ "schemaConfiguration" }) // The schema configuration must be loaded first
public class PluginConfiguration implements ApplicationContextAware, InitializingBean {
	
	private static final Logger log = LoggerFactory.getLogger(PluginConfiguration.class);
	private WebApplicationContext applicationContext;
	
	@Autowired
	private SproutModuleRegistrationRepository registrationRepository;
	
	@Bean
	public PluginsController pluginsController(WebApplicationContext context) {
		return new PluginsController(context);
	}
	
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = (WebApplicationContext)applicationContext;
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		Map<String, SproutModule> beans = applicationContext.getBeansOfType(SproutModule.class);
		log.info("module beans: {}", beans);
		
		for (Entry<String, SproutModule> entry : beans.entrySet()) {
			ensureRegistration(entry);
		}
	}

	private void ensureRegistration(Entry<String, SproutModule> entry) {
		Optional<SproutModuleRegistration> optItem = registrationRepository.findById(entry.getKey());
		if (!optItem.isPresent()) {
			SproutModuleRegistration item = new SproutModuleRegistration();
			item = new SproutModuleRegistration();
			item.setEnabled(true);
			item.setId(entry.getKey());
			item.setName(entry.getValue().getName());
			registrationRepository.save(item);
		}
	}

}
