package net.savantly.sprout.core.module;

import org.springframework.beans.factory.BeanNameAware;

public interface SproutModule extends BeanNameAware {

	String getKey();
	String getName();
	String getVersion();
	String getDescription();
	
	SproutModuleExecutionResponse install();
	SproutModuleExecutionResponse uninstall();
}
