package net.savantly.sprout.core.module;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public abstract class SproutModuleAdapter implements SproutModule, ApplicationContextAware {
	
	protected ApplicationContext appContext;

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
	
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.appContext = applicationContext;
	}

}
