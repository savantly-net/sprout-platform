package net.savantly.sprout.starter;

import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebMvc
public class SproutWebMvcConfigurer implements WebMvcConfigurer {
	
	// If the path has a dot, we'll consider it a static file request
	private String staticFilePattern = "*.*";
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/"+staticFilePattern, "/**/"+staticFilePattern)
			.addResourceLocations(
					"classpath:/static/", 
					"classpath:/public/", 
					"classpath:/resources/",
					"classpath:/META-INF/static/", 
					"classpath:/META-INF/public/", 
					"classpath:/META-INF/resources/");
	}
}
