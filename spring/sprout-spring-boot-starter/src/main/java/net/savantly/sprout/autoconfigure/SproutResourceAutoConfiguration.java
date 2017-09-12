package net.savantly.sprout.autoconfigure;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.core.SproutControllerConfiguration;
import net.savantly.sprout.core.module.DefaultModuleResourceProvider;
import net.savantly.sprout.core.module.DefaultResourceUrlFormatter;
import net.savantly.sprout.core.module.ModuleResourceProvider;
import net.savantly.sprout.core.module.ResourceUrlFormatter;

@Configuration
@ConditionalOnBean(SproutControllerConfiguration.class)
public class SproutResourceAutoConfiguration {
	
	@Value("${info.app.buildNumber:0}")
	private String buildNumber;
	
	@Bean
	public ModuleResourceProvider moduleResourceProvider(SproutControllerConfiguration controllerConfiguration, ResourceUrlFormatter resourceUrlFormatter){
		return new DefaultModuleResourceProvider(controllerConfiguration, resourceUrlFormatter);
	}
	
	@Bean
	@ConditionalOnMissingBean
	public ResourceUrlFormatter moduleResourceProvider(SproutControllerConfiguration controllerConfiguration){
		String cacheBustString = "?v=" + buildNumber;
		return new DefaultResourceUrlFormatter(true, controllerConfiguration.getResourcePath(), cacheBustString);
	}

}
