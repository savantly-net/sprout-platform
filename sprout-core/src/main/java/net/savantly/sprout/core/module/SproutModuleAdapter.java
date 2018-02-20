package net.savantly.sprout.core.module;

import java.util.HashMap;
import java.util.Map;

public abstract class SproutModuleAdapter implements SproutModule {

	private String key;
	
	public String getKey() {
		return this.key;
	}

	@Override
	public void setBeanName(String name) {
		this.key = name;
	}
	
	@Override
	public Map<String, String> getUserConfiguration() {
		return new HashMap<>();
	}

	@Override
	public void saveUserConfiguration(Map<String, String> configuration) {}

	@Override
	public Map<String, String> getAdminConfiguration() {
		return new HashMap<>();
	}

	@Override
	public void saveAdminConfiguration(Map<String, String> configuration) {}
}
