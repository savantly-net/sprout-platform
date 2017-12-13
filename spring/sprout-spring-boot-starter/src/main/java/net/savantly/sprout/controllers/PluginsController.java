package net.savantly.sprout.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.sprout.core.module.SproutModule;

@RestController
@RequestMapping("/rest/plugins")
public class PluginsController {
	
	private final static Logger log = LoggerFactory.getLogger(PluginsController.class);

	private ApplicationContext context;
	private HashMap<String, Object> plugins = new HashMap<String, Object>();
	
	public PluginsController(ApplicationContext context) {
		this.context = context;
	}
	
	@PostConstruct
	public void post() {
		this.context.getBeansOfType(SproutModule.class).entrySet().stream().forEach((m) -> {
			HashMap<String, Object> value = new HashMap<String, Object>();
			 value.put("name", m.getValue().name());
			 value.put("url", m.getValue().renderUrl());
			 value.put("config", m.getValue().getUserConfiguration());
			 plugins.put(m.getKey(), value);
		});
	}
	
	@RequestMapping({"", "/"})
	public Map<String, Object> getSproutModules(){
		return plugins;
	}
	
	@RequestMapping("/{name}/user-config")
	public Map<String, String> getSproutModuleUserConfig(@PathVariable("name") String name){
		SproutModule bean = this.context.getBean(name, SproutModule.class);
		return bean.getUserConfiguration();
	}

	@RequestMapping("/{name}/admin-config")
	public Map<String, String> getSproutModuleAdminConfig(@PathVariable("name") String name){
		SproutModule bean = this.context.getBean(name, SproutModule.class);
		return bean.getAdminConfiguration();
	}
}
