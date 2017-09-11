package net.savantly.sprout.autoconfigure.plugin;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.WebApplicationContext;

import net.savantly.sprout.autoconfigure.controller.SproutControllerConfiguration;
import net.savantly.sprout.core.plugin.SproutPlugin;
import net.savantly.sprout.core.plugin.SproutPluginRegistry;
import net.savantly.sprout.core.resource.SproutResourcePatternResolver;

@Service
public class DefaultSproutPluginRegistry implements SproutPluginRegistry{
	
	private static final Logger log = LoggerFactory.getLogger(DefaultSproutPluginRegistry.class);
	
	@Autowired
	WebApplicationContext ctx;
	@Autowired
	SproutControllerConfiguration controllerConfig;
	Map<String,Object> beans;
	List<String> pluginResources = new ArrayList<String>();
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@PostConstruct
	public void post() {
		beans = ctx.getBeansWithAnnotation(SproutPlugin.class);
		/*beans.forEach((key, value) -> {
			log.info("Finding resource for {}", key);
			@SuppressWarnings("unused")
			SproutPlugin anno = value.getClass().getAnnotation(SproutPlugin.class);
			SproutResourcePatternResolver resourceResolver = SproutResourcePatternResolver.of(value.getClass());
			for (String jsModuleSearchPattern : controllerConfig.getJsModuleSearchPatterns()) {
				resourceResolver.getResourcePaths(jsModuleSearchPattern, pluginResources);
			}			
		});*/
	}
	
	public Map<String,Object> getSproutPlugins(){
		return beans;
	}
	
	@Override
	public List<String> getAllPluginClientResourcePaths(){
		return pluginResources;
	}

}
