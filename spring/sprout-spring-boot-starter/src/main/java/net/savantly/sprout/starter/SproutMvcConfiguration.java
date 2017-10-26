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
		registry.addResourceHandler("/admin/**").addResourceLocations("/static/admin/", "classpath:/static/admin/");
	}
	
/*	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		String index = "index";
		registry.addViewController("/").setViewName(index);
		registry.addViewController("/admin").setViewName("admin/index");
		registry.addViewController("/admin/^((?!\\.js).)*$").setViewName("admin/index");
	}*/
	
/*	@RequestMapping("/")
	public ModelAndView index() {
		return new ModelAndView("/index.html");
	}*/

}
