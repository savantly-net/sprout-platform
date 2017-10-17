package net.savantly.sprout.starter;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import net.savantly.sprout.autoconfigure.SproutResourceAutoConfiguration;

@Controller
public class SproutMvcConfiguration extends WebMvcConfigurerAdapter{
	
	private final String resourcesLocation;
	
	public SproutMvcConfiguration(SproutResourceAutoConfiguration resourceConfiguration) {
		resourcesLocation = resourceConfiguration.getWebRoot();
	}
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/**").addResourceLocations(resourcesLocation);
	}
	
/*	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		String index = "index";
		registry.addViewController("/").setViewName(index);
	}*/
	
	@RequestMapping("/")
	public ModelAndView index() {
		return new ModelAndView("index");
	}

}
