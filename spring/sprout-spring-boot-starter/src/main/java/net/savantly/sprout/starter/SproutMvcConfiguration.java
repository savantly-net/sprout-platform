package net.savantly.sprout.starter;

import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

public class SproutMvcConfiguration extends WebMvcConfigurerAdapter{
	
	// If the path has a dot, we'll consider it a static file request
	private String staticFilePattern = "*.*";
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/", "/"+staticFilePattern, "/**/"+staticFilePattern).addResourceLocations("classpath:/static/", "classpath:/public/", "classpath:/META-INF/resources/", "classpath:/META-INF/resources/ui/");
		registry.addResourceHandler("/admin/", "/admin/"+staticFilePattern, "/admin/**/"+staticFilePattern).addResourceLocations("/static/admin/", "classpath:/static/admin/", "classpath:/META-INF/resources/admin/");
	}
	
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {

	}

}
