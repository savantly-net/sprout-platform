package net.savantly.sprout.module.example;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;

import lombok.Data;
import net.savantly.sprout.core.module.SproutModuleConfiguration;
import net.savantly.sprout.module.example.api.ExamplePanelApi;

/**
 * 
 * An example of how the 'application.properties' values can be injected at runtime into other beans
 *
 */
@Data
@SproutModuleConfiguration
@ConfigurationProperties("example")
public class ExamplePanelModuleConfiguration {
	
	private String message = "";

	@Bean
	public ExamplePanelApi exampleApi() {
		return new ExamplePanelApi(message);
	}

}
