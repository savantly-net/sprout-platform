package net.savantly.sprout.starter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.core.configuration.SproutControllerConfiguration;

@Configuration(DefaultSproutControllerConfiguration.BEAN_NAME)
@ConfigurationProperties("savantly.sprout.controller")
public class DefaultSproutControllerConfiguration implements SproutControllerConfiguration {
	
	public static final String BEAN_NAME = "sproutControllerConfiguration";

	private Map<String, Object> config = new HashMap<>();
	private String resourcePrefix = "classpath*:";
	private String resourcePath = "/static/";
	private String modulesFolder = "modules";
	private String coreFolder = "sprout";
	private String headerView = "'sprout/core/views/header.view.html'";
	private String footerView = "'sprout/core/views/footer.view.html'";
	private String footerText = "<b>Sprout</b> by <a href=\"http://savantly.net\" target=\"_blank\">Savantly.net</a>";
	private String logoutUrl = "/logout";
	private String loginUrl = "/login";
	private List<String> jsLibs = new ArrayList<>();
	private List<String> jsCoreLibs = new ArrayList<>();
	private List<String> cssLibs = new ArrayList<>();
	private List<String> cssCoreLibs = new ArrayList<>();
	private List<String> jsCoreSearchPatterns = new ArrayList<>();
	private List<String> jsModuleSearchPatterns = new ArrayList<>();
	private List<String> cssModuleSearchPatterns = new ArrayList<>();
	
	@PostConstruct
	public void post() {
		if(jsCoreSearchPatterns.isEmpty()){
			addJsCoreSearchPatterns();
		}
		if(jsModuleSearchPatterns.isEmpty()){
			addDefaultJsModuleSearchPatterns();
		}
		if(jsCoreLibs.isEmpty()){
			addDefaultJsCoreLibs();
		}
		if(cssCoreLibs.isEmpty()){
			addDefaultCssCoreLibs();
		}
		if(cssModuleSearchPatterns.isEmpty()){
			addDefaultCssModuleSearchPatterns();
		}
	}
	
	private void addDefaultCssCoreLibs() {
		cssCoreLibs.add("https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.5/angular-material.min.css");
	}

	private void addDefaultJsCoreLibs() {
		jsCoreLibs.add("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular.min.js");
		jsCoreLibs.add("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular-animate.min.js");
		jsCoreLibs.add("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular-aria.min.js");
		jsCoreLibs.add("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular-resource.min.js");
		jsCoreLibs.add("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular-cookies.min.js");
		jsCoreLibs.add("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular-sanitize.min.js");
		jsCoreLibs.add("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular-route.min.js");
		jsCoreLibs.add("https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.3/angular-ui-router.js");
		jsCoreLibs.add("https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.5/angular-material.min.js");
	}

	private void addJsCoreSearchPatterns() {
		String corePath = this.getResourcePath() + this.getCoreFolder();
		jsCoreSearchPatterns.add(corePath + "/config.js");
		jsCoreSearchPatterns.add(corePath + "/application.js");
		jsCoreSearchPatterns.add(corePath + "/core/*.js");
		jsCoreSearchPatterns.add(corePath + "/core/config/*.js");
		jsCoreSearchPatterns.add(corePath + "/core/controllers/*.js");
		jsCoreSearchPatterns.add(corePath + "/core/services/*.js");
	}

	private void addDefaultCssModuleSearchPatterns() {
		String modulePath = getModulePath();
		cssModuleSearchPatterns.add(modulePath + "/*/css/*.css");
	}

	private void addDefaultJsModuleSearchPatterns() {
		String modulePath = getModulePath();
		jsModuleSearchPatterns.add(modulePath + "/*/*.js");
		jsModuleSearchPatterns.add(modulePath + "/*/config/*.js");
		jsModuleSearchPatterns.add(modulePath + "/*/controllers/*.js");
		jsModuleSearchPatterns.add(modulePath + "/*/services/*.js");
		jsModuleSearchPatterns.add(modulePath + "/*/directives/*.js");
		jsModuleSearchPatterns.add(modulePath + "/*/filters/*.js");
	}

	public String getModulePath() {
		return String.format("%s%s%s", resourcePrefix, resourcePath, modulesFolder);
	}


	@Override
	public Map<String, Object> getConfig() {
		return config;
	}

	public void setConfig(Map<String, Object> config) {
		this.config = config;
	}

	@Override
	public String getResourcePath() {
		return resourcePath;
	}

	public void setResourcePath(String resourcePath) {
		this.resourcePath = resourcePath;
	}

	@Override
	public List<String> getJsLibs() {
		return jsLibs;
	}

	public void setJsLibs(List<String> jsLibs) {
		this.jsLibs = jsLibs;
	}

	@Override
	public List<String> getCssLibs() {
		return cssLibs;
	}

	public void setCssLibs(List<String> cssLibs) {
		this.cssLibs = cssLibs;
	}

	@Override
	public List<String> getCssCoreLibs() {
		return cssCoreLibs;
	}

	public void setCssCoreLibs(List<String> cssCoreLibs) {
		this.cssCoreLibs = cssCoreLibs;
	}

	@Override
	public List<String> getJsModuleSearchPatterns() {
		return jsModuleSearchPatterns;
	}


	public void setJsModuleSearchPatterns(List<String> jsModuleSearchPatterns) {
		this.jsModuleSearchPatterns = jsModuleSearchPatterns;
	}


	@Override
	public String getModulesFolder() {
		return modulesFolder;
	}


	public void setModulesFolder(String modulesFolder) {
		this.modulesFolder = modulesFolder;
	}

	@Override
	public List<String> getCssModuleSearchPatterns() {
		return cssModuleSearchPatterns;
	}

	public void setCssModuleSearchPatterns(List<String> cssModuleSearchPatterns) {
		this.cssModuleSearchPatterns = cssModuleSearchPatterns;
	}

	public String getResourcePrefix() {
		return resourcePrefix;
	}

	public void setResourcePrefix(String resourcePrefix) {
		this.resourcePrefix = resourcePrefix;
	}

	@Override
	public String getCoreFolder() {
		return coreFolder;
	}

	public void setCoreFolder(String coreFolder) {
		this.coreFolder = coreFolder;
	}

	@Override
	public List<String> getJsCoreSearchPatterns() {
		return jsCoreSearchPatterns;
	}

	public void setJsCoreSearchPatterns(List<String> jsCoreSearchPatterns) {
		this.jsCoreSearchPatterns = jsCoreSearchPatterns;
	}

	@Override
	public List<String> getJsCoreLibs() {
		return jsCoreLibs;
	}

	public void setJsCoreLibs(List<String> jsCoreLibs) {
		this.jsCoreLibs = jsCoreLibs;
	}

	@Override
	public String getHeaderView() {
		return headerView;
	}

	public void setHeaderView(String headerView) {
		this.headerView = headerView;
	}

	@Override
	public String getFooterView() {
		return footerView;
	}

	public void setFooterView(String footerView) {
		this.footerView = footerView;
	}

	@Override
	public String getFooterText() {
		return footerText;
	}

	public void setFooterText(String footerText) {
		this.footerText = footerText;
	}

	@Override
	public String getLogoutUrl() {
		return logoutUrl;
	}

	public void setLogoutUrl(String logoutUrl) {
		this.logoutUrl = logoutUrl;
	}

	@Override
	public String getLoginUrl() {
		return loginUrl;
	}

	public void setLoginUrl(String loginUrl) {
		this.loginUrl = loginUrl;
	}

}
