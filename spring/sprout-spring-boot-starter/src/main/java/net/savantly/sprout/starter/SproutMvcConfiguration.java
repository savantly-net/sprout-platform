package net.savantly.sprout.starter;

import java.nio.file.Paths;

import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

public class SproutMvcConfiguration extends WebMvcConfigurerAdapter{

	public static final String targetFolder = Paths.get(System.getProperty("user.home"), "sprout-ui").toString();
	
	public static final String resourcesLocation = String.format("file:%s/dist/", targetFolder);
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		super.addResourceHandlers(registry);
		registry.addResourceHandler("/**").addResourceLocations(resourcesLocation);
	}
	
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		super.addViewControllers(registry);
		String index = "index";
		registry.addViewController("/").setViewName(index);
	}
	

}
