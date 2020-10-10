package net.savantly.sprout.core.module;

public interface SproutModule {

	/**
	 * The ID of the plugin. This is used on the client for navigation.
	 * Should be in the format '{org}-{pluginName}'
	 * @return
	 */
	String getId();
	
	/**
	 * The friendly name of the module
	 * @return
	 */
	String getName();
	
	/**
	 * The semver format of the version
	 * @return
	 */
	String getVersion();
	
	/**
	 * The description of what this module provides
	 * @return
	 */
	String getDescription();
	
	/**
	 * TODO: Not sure if this is necessary since modules can provide their own UI and APIs
	 * @return
	 */
	default SproutModuleExecutionResponse install() {
		return new SimpleSproutModuleExecutionResponse(true, 0, "nothing to install");
	}
	
	/**
	 * TODO: Not sure if this is necessary since modules can provide their own UI and APIs
	 * @return
	 */
	default SproutModuleExecutionResponse uninstall() {
		return new SimpleSproutModuleExecutionResponse(true, 0, "nothing to uninstall");
	}
}
