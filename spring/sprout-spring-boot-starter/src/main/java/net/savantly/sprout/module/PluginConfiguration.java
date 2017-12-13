package net.savantly.sprout.module;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.WebApplicationContext;

import net.savantly.sprout.controllers.PluginsController;

@Configuration
public class PluginConfiguration {
	
	@Bean
	public PluginsController pluginsController(WebApplicationContext context) {
		return new PluginsController(context);
	}
	
	@Bean
	public SproutModuleAspect sproutModuleAspect() {
		return new SproutModuleAspect();
	}

}
