package net.savantly.sprout.autoconfigure;

import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;

import net.savantly.sprout.starter.SproutMvcConfiguration;

@Configuration
@AutoConfigureBefore(WebMvcAutoConfiguration.class)
public class SproutWebMvcAutoConfiguration {
	
	@Bean
	public SproutMvcConfiguration sproutMvcAutoConfigurationAdapter() {
		return new SproutMvcConfiguration();
	}
	
	@Bean 
	public FreeMarkerViewResolver freemarkerViewResolver() { 
	    FreeMarkerViewResolver resolver = new FreeMarkerViewResolver(); 
	    resolver.setSuffix(".html"); 
	    return resolver; 
	}
	
	@Bean 
	public FreeMarkerConfigurer freemarkerConfig(ResourceLoader resourceLoader) { 
	    FreeMarkerConfigurer freeMarkerConfigurer = new FreeMarkerConfigurer(); 
	    freeMarkerConfigurer.setTemplateLoaderPath(SproutMvcConfiguration.resourcesLocation);
	    return freeMarkerConfigurer; 
	}
	
	

}
