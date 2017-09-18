package net.savantly.sprout.autoconfigure;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.core.configuration.SproutConfiguration;
import net.savantly.sprout.core.module.DefaultResourceUrlFormatter;
import net.savantly.sprout.core.module.ResourceUrlFormatter;
import net.savantly.sprout.core.resource.SproutResourcePatternResolver;
import net.savantly.sprout.core.ui.UiLoader;
import net.savantly.sprout.starter.SproutMvcConfiguration;

@Configuration
@AutoConfigureBefore(WebMvcAutoConfiguration.class)
public class SproutResourceAutoConfiguration {

	@Value("${info.app.buildNumber:0}")
	private String buildNumber;
	@Value("${sprout.client.build:false}")
	private boolean buildClient;

/*	@Bean
	public ModuleResourceProvider moduleResourceProvider(SproutConfiguration controllerConfiguration,
			ResourceUrlFormatter resourceUrlFormatter) {
		return new DefaultModuleResourceProvider(SproutResourceAutoConfiguration.class, controllerConfiguration, resourceUrlFormatter);
	}*/

	@Bean
	@ConditionalOnMissingBean(ObjectMapper.class)
	ObjectMapper objectMapper() {
		return new ObjectMapper();
	}

/*	@Bean
	@ConditionalOnMissingBean(ResourceUrlFormatter.class)
	public ResourceUrlFormatter resourceUrlFormatter(SproutConfiguration controllerConfiguration) {
		String cacheBustString = "?v=" + buildNumber;
		return new DefaultResourceUrlFormatter(true, controllerConfiguration.getResourcePath(), cacheBustString);
	}*/

	@Bean
	@SuppressWarnings({ "unchecked", "rawtypes" })
	UiLoader defaultUiLoader() throws IOException, InterruptedException {
		
		UiLoader loader = new UiLoader(SproutResourcePatternResolver.of(SproutResourceAutoConfiguration.class), SproutMvcConfiguration.targetFolder, "classpath*:/**/*-resources.zip");
		if(buildClient) {
			loader.init();
		}
		return loader;
	}

}
