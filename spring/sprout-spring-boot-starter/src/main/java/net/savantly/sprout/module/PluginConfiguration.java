package net.savantly.sprout.module;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.WebApplicationContext;

import net.savantly.sprout.controllers.PluginsController;
import net.savantly.sprout.core.module.SproutModuleConfiguration;

@Configuration
@AutoConfigureBefore(WebMvcAutoConfiguration.class)
public class PluginConfiguration implements ApplicationContextAware, InitializingBean {
	
	private static final Logger log = LoggerFactory.getLogger(PluginConfiguration.class);
	private WebApplicationContext applicationContext;
	
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
		Map<String, Object> beans = applicationContext.getBeansWithAnnotation(SproutModuleConfiguration.class);
		log.info("module beans: {}", beans);
	}

}
