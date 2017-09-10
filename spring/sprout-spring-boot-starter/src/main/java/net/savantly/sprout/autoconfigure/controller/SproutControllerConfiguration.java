package net.savantly.sprout.autoconfigure.controller;

import java.util.List;
import java.util.Map;

public interface SproutControllerConfiguration {

	Map<String, Object> getConfig();

	String getResourcePath();

	List<String> getCssLibs();

	List<String> getJsLibs();

	List<String> getCssModuleSearchPatterns();

	String getModulesFolder();

	List<String> getJsModuleSearchPatterns();

	List<String> getJsCoreSearchPatterns();

	String getCoreFolder();

	List<String> getJsCoreLibs();

	String getFooterView();

	String getHeaderView();

	List<String> getCssCoreLibs();

	String getFooterText();

	String getLogoutUrl();

	String getLoginUrl();

}
