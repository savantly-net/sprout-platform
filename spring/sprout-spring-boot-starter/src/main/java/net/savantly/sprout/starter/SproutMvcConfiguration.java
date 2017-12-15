package net.savantly.sprout.starter;

import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

public class SproutMvcConfiguration extends WebMvcConfigurerAdapter{
	
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/**").addResourceLocations("classpath:/static/", "classpath:/public/", "classpath:/META-INF/resources/", "classpath:/META-INF/resources/ui/");
		registry.addResourceHandler("/admin/**").addResourceLocations("/static/admin/", "classpath:/static/admin/", "classpath:/META-INF/resources/admin/");
	}
	
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {

	}

}
