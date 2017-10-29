package net.savantly.sprout.starter;

import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

public class SproutMvcConfiguration extends WebMvcConfigurerAdapter{
	
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/**").addResourceLocations("classpath:/static/ui/");
		registry.addResourceHandler("/admin/**").addResourceLocations("/static/admin/", "classpath:/static/admin/");
	}

}
