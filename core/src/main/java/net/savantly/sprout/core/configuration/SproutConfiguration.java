package net.savantly.sprout.core.configuration;

import java.util.Map;

public interface SproutConfiguration {
	
	public static final long serialVersionUID = 1L;

	public static final String SPROUT_HOME_ENV = "SPROUT_HOME";
	public static final String SPROUT_HOME_PROP = "sprout.home";

	Map<String, Object> getConfig();

	String getResourcePath();

	String getFooterText();

}
