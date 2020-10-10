package net.savantly.sprout.module.openTok;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import net.savantly.sprout.core.module.SimpleSproutModuleExecutionResponse;
import net.savantly.sprout.core.module.SproutModuleExecutionResponse;
import net.savantly.sprout.core.module.SproutWebModule;

@Configuration(OpenTokModule.BEAN_NAME)
@Import(OpenTokModuleConfiguration.class)
public class OpenTokModule implements SproutWebModule {
	
	protected static final String BEAN_NAME = "openTokModule";
	public static final String version = "0.0.1";

	@Override
	public String getId() {
		return BEAN_NAME;
	}

	@Override
	public String getName() {
		return "OpenTok Video Module";
	}

	@Override
	public String getVersion() {
		return version;
	}

	@Override
	public String getDescription() {
		return "This module provides APIs to interact with the OpenTok cloud server";
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
		return "<h1>OpenTok Integration</h1>";
	}

}