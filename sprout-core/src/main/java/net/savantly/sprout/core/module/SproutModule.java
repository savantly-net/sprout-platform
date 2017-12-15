package net.savantly.sprout.core.module;

import java.util.Map;

import org.springframework.beans.factory.BeanNameAware;

public interface SproutModule extends BeanNameAware {

	String getKey();
	String getName();
	String getWelcomeUrl();
	String getVersion();
	String getDescription();
	
	SproutModuleExecutionResponse install();
	SproutModuleExecutionResponse uninstall();
	
	Map<String, String> getUserConfiguration();
	void saveUserConfiguration(Map<String, String> configuration);
	
	Map<String, String> getAdminConfiguration();
	void saveAdminConfiguration(Map<String, String> configuration);

}
