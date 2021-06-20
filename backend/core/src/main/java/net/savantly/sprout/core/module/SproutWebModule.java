package net.savantly.sprout.core.module;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.util.StreamUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.savantly.sprout.core.module.web.plugin.PluginMeta;

/**
 * A specialized SproutModule that provides a way to modify the User Interface<br>
 * The UI executes the provided resources in this order - <br>
 * {@link #getScriptResources()}<br>
 *
 */
@SuppressWarnings("unchecked")
public interface SproutWebModule extends SproutModule {
	
	static Logger log = LoggerFactory.getLogger(SproutWebModule.class);
	static ObjectMapper mapper = new ObjectMapper();
	static ResourceLoader resourceLoader = new DefaultResourceLoader();

	default PluginMeta getPluginMeta() {
		String resourceLocation = String.format("classpath:public/api/plugins/%s/plugin.json", getId());
		PluginMeta pluginMeta = null;
		Resource resource = resourceLoader.getResource(resourceLocation);
		if (resource.exists()) {
			try {
				pluginMeta = mapper.readValue(resource.getInputStream(), PluginMeta.class);
			} catch (IOException e) {
				log.error("failed to read plugin.json", e);
				pluginMeta = new PluginMeta().setId(getId()).setName(getName());
			}
		} else {
			log.error("plugin metadata not found: {}", resourceLocation);
			pluginMeta = new PluginMeta().setId(getId()).setName(getName());
		}
		String baseUrl = String.format("/api/plugins/%s", pluginMeta.getId());
		pluginMeta.setBaseUrl(baseUrl)
			.setDefaultNavUrl("")
			.setModule(String.format("%s/module.js", baseUrl, pluginMeta.getId()))
			.setEnabled(true)
			.setHasUpdate(false);
		return pluginMeta;
	}
	
	/**
	 * This method should return browser markup. <br>
	 * The markdown/markup is rendered in the plugin information panel, and may be used to interact with the module's rest controllers or other APIs.  <br>
	 * <br>
	 * For more complex integration, consider creating a React Component library bundle in UMD format and/or provide UIRoutes and NavigationItems <br>
	 * <br>
	 * See - <br>
	 * {@link #getScriptResources()}<br>
	 * 
	 * @return
	 * HTML/Markdown for rendering in the UI
	 */
	default String getPluginInformationContent() {
		String resourceLocation = String.format("classpath:/public/api/plugins/%s/README.md", getId());
		Resource resource = resourceLoader.getResource(resourceLocation);
		if (resource.exists()) {
			try {
				return StreamUtils.copyToString(resource.getInputStream(), Charset.defaultCharset());
			} catch (IOException e) {
				log.error("failed to read README.md");
			}
		}
		return String.format("<h1>%s</h1>", getName());
	}

	
	/**
	 * Modules can provide additional script resources to the UI
	 * The scripts are loaded in the UI after the built-in scripts
	 * Script resources should be bundled in UMD format - like a React Component Library
	 * @return
	 */
	default List<String> getScriptResources(){
		return Collections.EMPTY_LIST;
	}
}
