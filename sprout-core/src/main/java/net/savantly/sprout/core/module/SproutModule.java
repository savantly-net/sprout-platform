package net.savantly.sprout.core.module;

import java.util.Map;

public interface SproutModule {

	String name();
	String welcomeUrl();
	
	Map<String, String> getUserConfiguration();
	void saveUserConfiguration(Map<String, String> configuration);
	
	Map<String, String> getAdminConfiguration();
	void saveAdminConfiguration(Map<String, String> configuration);

}
