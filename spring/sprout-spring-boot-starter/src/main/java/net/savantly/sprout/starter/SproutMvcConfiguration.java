package net.savantly.sprout.starter;

import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
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
	}
	
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		String index = "index";
		registry.addViewController("/").setViewName(index);
	}
	

}
