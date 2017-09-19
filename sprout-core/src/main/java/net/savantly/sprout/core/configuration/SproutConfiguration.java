package net.savantly.sprout.core.configuration;

import java.util.Map;

public interface SproutConfiguration {
	
	public static final long serialVersionUID = 1L;

	Map<String, Object> getConfig();

	String getResourcePath();

	String getFooterText();

}
