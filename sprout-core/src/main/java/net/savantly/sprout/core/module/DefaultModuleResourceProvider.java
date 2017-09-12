package net.savantly.sprout.core.module;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.io.Resource;

import net.savantly.sprout.core.SproutControllerConfiguration;
import net.savantly.sprout.core.resource.SproutResourcePatternResolver;

public class DefaultModuleResourceProvider implements ModuleResourceProvider {

	private final SproutControllerConfiguration controllerConfig;
	
	private final SproutResourcePatternResolver<DefaultModuleResourceProvider> patternResolver = SproutResourcePatternResolver
			.of(DefaultModuleResourceProvider.class);
	private final ResourceUrlFormatter resourceUrlFormatter;
	
	private List<String> jsCoreLibResourceArray;
	private List<String> jsLibResourceArray;
	private List<String> jsCoreResourceArray;
	private List<String> jsResourceArray;
	private List<String> cssCoreLibResourceArray;
	private List<String> cssLibResourceArray;
	private List<String> cssResourceArray;
	
	@Override
	public List<String> getJsResources(){
		List<String> resources = new ArrayList<>();
		resources.addAll(jsCoreLibResourceArray);
		resources.addAll(jsLibResourceArray);
		resources.addAll(jsCoreResourceArray);
		resources.addAll(jsResourceArray);
		return resources;
	}
		
	@Override
	public List<String> getCssResources(){
		List<String> resources = new ArrayList<>();
		resources.addAll(cssCoreLibResourceArray);
		resources.addAll(cssLibResourceArray);
		resources.addAll(jsCoreResourceArray);
		resources.addAll(cssResourceArray);
		return resources;
	}
	
	public DefaultModuleResourceProvider(SproutControllerConfiguration controllerConfiguration, ResourceUrlFormatter resourceUrlFormatter) {
		this.controllerConfig = controllerConfiguration;
		this.resourceUrlFormatter = resourceUrlFormatter;
		init();
	}
	
	public void init() {
		// Load Core JS Libraries
		jsCoreLibResourceArray = new ArrayList<String>();
		for (String item : controllerConfig.getJsCoreLibs()) {
			jsCoreLibResourceArray.addAll(getResourcePaths(item));
		}
		// Load JS Libraries
		jsLibResourceArray = new ArrayList<String>();
		for (String item : controllerConfig.getJsLibs()) {
			jsLibResourceArray.addAll(getResourcePaths(item));
		}
		// Load Core Sprout JS
		jsCoreResourceArray = new ArrayList<String>();
		for (String item : controllerConfig.getJsCoreSearchPatterns()) {
			jsCoreResourceArray.addAll(getResourcePaths(item));
		}
		// Load JS Modules
		jsResourceArray = new ArrayList<String>();
		for (String item : controllerConfig.getJsModuleSearchPatterns()) {
			jsResourceArray.addAll(getResourcePaths(item));
		}
		// Load Core CSS Libraries
		cssCoreLibResourceArray = new ArrayList<String>();
		for (String item : controllerConfig.getCssCoreLibs()) {
			cssCoreLibResourceArray.addAll(getResourcePaths(item));
		}
		// Load CSS Libraries
		cssLibResourceArray = new ArrayList<String>();
		for (String item : controllerConfig.getCssLibs()) {
			cssLibResourceArray.addAll(getResourcePaths(item));
		}
		// Load CSS Modules
		cssResourceArray = new ArrayList<String>();
		for (String item : controllerConfig.getCssModuleSearchPatterns()) {
			cssResourceArray.addAll(getResourcePaths(item));
		}
	}
	

	private List<String> getResourcePaths(String path) {
		Resource[] resources = patternResolver.getResourcePaths(path);
		return resourceUrlFormatter.format(resources);
	}
}
