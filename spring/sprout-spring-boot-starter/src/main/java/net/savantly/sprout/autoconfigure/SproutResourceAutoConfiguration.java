package net.savantly.sprout.autoconfigure;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.core.configuration.SproutControllerConfiguration;
import net.savantly.sprout.core.module.DefaultModuleResourceProvider;
import net.savantly.sprout.core.module.DefaultResourceUrlFormatter;
import net.savantly.sprout.core.module.ModuleResourceProvider;
import net.savantly.sprout.core.module.ResourceUrlFormatter;
import net.savantly.sprout.starter.DefaultSproutBaseController;
import net.savantly.sprout.starter.DefaultSproutControllerConfiguration;
import net.savantly.sprout.starter.SproutBaseController;

@Configuration
@AutoConfigureBefore(WebMvcAutoConfiguration.class)
public class SproutResourceAutoConfiguration {

	@Value("${info.app.buildNumber:0}")
	private String buildNumber;

	@Bean
	public ModuleResourceProvider moduleResourceProvider(SproutControllerConfiguration controllerConfiguration,
			ResourceUrlFormatter resourceUrlFormatter) {
		return new DefaultModuleResourceProvider(SproutResourceAutoConfiguration.class, controllerConfiguration, resourceUrlFormatter);
	}

	@Bean
	@ConditionalOnMissingBean(SproutControllerConfiguration.class)
	SproutControllerConfiguration sproutControllerConfiguration() {
		return new DefaultSproutControllerConfiguration();
	}

	@Bean
	@ConditionalOnMissingBean(ObjectMapper.class)
	ObjectMapper objectMapper() {
		return new ObjectMapper();
	}

	@Bean
	@ConditionalOnMissingBean(ResourceUrlFormatter.class)
	public ResourceUrlFormatter resourceUrlFormatter(SproutControllerConfiguration controllerConfiguration) {
		String cacheBustString = "?v=" + buildNumber;
		return new DefaultResourceUrlFormatter(true, controllerConfiguration.getResourcePath(), cacheBustString);
	}

	@Bean
	@ConditionalOnMissingBean(SproutBaseController.class)
	SproutBaseController defaultSproutBaseController(ObjectMapper objectMapper,
			SproutControllerConfiguration controllerConfig, ModuleResourceProvider resourceProvider) {
		return new DefaultSproutBaseController(objectMapper, controllerConfig, resourceProvider);
	}

}
