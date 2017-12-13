package net.savantly.sprout.module;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import net.savantly.sprout.core.module.SproutModule;

@Service
public class SproutModuleRegistry {

	private static Map<String, Object> plugins = new HashMap<>();
	private static AnnotationConfigWebApplicationContext applicationContext = new AnnotationConfigWebApplicationContext();
	private RequestMappingHandlerMapping mapping = new RequestMappingHandlerMapping();
	
	public SproutModuleRegistry(ApplicationContext parent) {
		applicationContext.setParent(parent);
		applicationContext.refresh();
		mapping.setApplicationContext(applicationContext);
	}

	public AnnotationConfigWebApplicationContext getApplicationContext() {
		return this.applicationContext;
	}

	public static <T extends SproutModule> void registerPluginModule(String beanName, T instance) {
		applicationContext.getBeanFactory().registerSingleton(beanName, instance);
		plugins.put(beanName, instance);
	}

	@EventListener
	public void handleContextRefresh(ContextRefreshedEvent event) {
		this.mapping.afterPropertiesSet();
	}

}
