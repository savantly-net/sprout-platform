package net.savantly.sprout.starter;

import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class SproutMvcConfiguration implements WebMvcConfigurer {
	
	// If the path has a dot, we'll consider it a static file request
	private String staticFilePattern = "*.*";
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/", "/"+staticFilePattern, "/**/"+staticFilePattern)
			.addResourceLocations("classpath:/static/", "classpath:/public/", "classpath:/META-INF/resources/", "classpath:/META-INF/resources/ui/");
		
		registry.addResourceHandler("/admin/", "/admin/"+staticFilePattern, "/admin/**/"+staticFilePattern)
			.addResourceLocations("/static/admin/", "classpath:/static/admin/", "classpath:/META-INF/resources/admin/");
	}
	/*
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		super.addInterceptors(registry);
	}
	*/

}
