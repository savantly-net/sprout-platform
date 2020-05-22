package net.savantly.sprout.core.module;

import java.util.Map;

public interface ConfigurableSproutModule extends SproutModule {

	Map<String, Object> getUserConfiguration();
	void saveUserConfiguration(Map<String, String> configuration);
	
	Map<String, Object> getAdminConfiguration();
	void saveAdminConfiguration(Map<String, String> configuration);
}
