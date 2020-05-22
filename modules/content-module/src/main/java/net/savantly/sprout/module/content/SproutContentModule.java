package net.savantly.sprout.module.content;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import net.savantly.sprout.core.configuration.SproutConfiguration;
import net.savantly.sprout.core.module.SproutModule;
import net.savantly.sprout.core.module.SproutModuleConfiguration;
import net.savantly.sprout.core.module.SproutModuleExecutionResponse;

@EntityScan
@Configuration(SproutContentModule.BEAN_NAME)
@EnableJpaRepositories
@SproutModuleConfiguration("SproutContentModule")
@Import(SproutContentModuleConfiguration.class)
public class SproutContentModule implements SproutModule {
	
	protected static final String BEAN_NAME = "contentModule";
	private String beanName;

	@Override
	public void setBeanName(String name) {
		this.beanName = name;
	}

	@Override
	public String getKey() {
		return "sprout-content-module";
	}

	@Override
	public String getName() {
		return "Sprout Content Module";
	}

	@Override
	public String getVersion() {
		return String.format("%s", SproutConfiguration.serialVersionUID);
	}

	@Override
	public String getDescription() {
		return "This module provides dynamic content management for the Sprout Platform";
	}

	@Override
	public SproutModuleExecutionResponse install() {
		// nothing to install
		return null;
	}

	@Override
	public SproutModuleExecutionResponse uninstall() {
		// nothing to uninstall
		return null;
	}

}
