package net.savantly.sprout.core.module;

public interface SproutModule {

	/**
	 * The ID of the plugin. This is used on the client for navigation.<br>
	 * Should be in the format '{org}-{pluginName}'<br>
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
}
