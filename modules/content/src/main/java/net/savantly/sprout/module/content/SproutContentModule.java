package net.savantly.sprout.module.content;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import net.savantly.sprout.core.module.SimpleSproutModuleExecutionResponse;
import net.savantly.sprout.core.module.SproutModuleExecutionResponse;
import net.savantly.sprout.core.module.SproutWebModule;

@EntityScan
@Configuration(SproutContentModule.BEAN_NAME)
@EnableJpaRepositories
@Import(SproutContentModuleConfiguration.class)
public class SproutContentModule implements SproutWebModule {
	
	protected static final String BEAN_NAME = "contentModule";
	public static final String version = "0.0.1";

	@Override
	public String getKey() {
		return BEAN_NAME;
	}

	@Override
	public String getName() {
		return "Sprout Content Module";
	}

	@Override
	public String getVersion() {
		return version;
	}

	@Override
	public String getDescription() {
		return "This module provides dynamic content management for the Sprout Platform";
	}

	@Override
	public SproutModuleExecutionResponse install() {
		// nothing to install
		return new SimpleSproutModuleExecutionResponse(true, 0, "nothing to install");
	}

	@Override
	public SproutModuleExecutionResponse uninstall() {
		// nothing to uninstall
		return new SimpleSproutModuleExecutionResponse(true, 0, "nothing to uninstall");
	}

	@Override
	public String getPluginInformationMarkup() {
		return "<iframe src=\"/admin/content\" width=\"100%\" height=\"500px\"></iframe>";
	}

}
