package net.savantly.sprout.starter;

import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import net.savantly.sprout.autoconfigure.SproutResourceAutoConfiguration;

public class SproutMvcConfiguration extends WebMvcConfigurerAdapter{
	
	private final String resourcesLocation;
	
	public SproutMvcConfiguration(SproutResourceAutoConfiguration resourceConfiguration) {
		resourcesLocation = resourceConfiguration.getWebRoot();
	}
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/**").addResourceLocations(resourcesLocation);
		registry.addResourceHandler("/admin/**").addResourceLocations("/static/admin/", "classpath:/static/admin/");
	}

}
