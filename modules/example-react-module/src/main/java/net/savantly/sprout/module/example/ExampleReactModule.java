package net.savantly.sprout.module.example;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.Resource;
import org.springframework.util.FileCopyUtils;

import net.savantly.sprout.core.module.SproutWebModule;
import net.savantly.sprout.core.module.web.NavigationItem;
import net.savantly.sprout.core.module.web.SimpleNavigationItem;
import net.savantly.sprout.core.module.web.SimpleUIRoute;
import net.savantly.sprout.core.module.web.UIRoute;

@Configuration(ExampleReactModule.BEAN_NAME)
@Import(ExampleReactModuleConfiguration.class)
public class ExampleReactModule implements SproutWebModule {
	
	protected static final String BEAN_NAME = "exampleReactModule";
	public static final String version = "0.0.1";
	private static final String UI_ROUTE_PATH = "/example";
	private static final String ADMIN_PANEL_HTML_PATH = "classpath:/embedded/panel.html";
	
	@Value(ADMIN_PANEL_HTML_PATH)
	Resource htmlFileResource;

	@Override
	public String getKey() {
		return BEAN_NAME;
	}

	@Override
	public String getVersion() {
		return version;
	}

	@Override
	public String getName() {
		return "Example React Module";
	}

	/**************************************************************
	 * Admin UI Customization
	 **************************************************************/
	
	@Override
	public String getDescription() {
		return "This module is an example of how we can add server and client side modifications";
	}
	
	@Override
	public String getAdminPanelMarkup() {
		try {
			return asString(htmlFileResource);
		} catch (IOException e) {
			return String.format("<h2>Error loading %s</h2>", ADMIN_PANEL_HTML_PATH);
		}
	}
	
	@Override
	public List<NavigationItem> getNavigationItems() {
		// Adding a sidebar navigation item to the UI route/component we're providing
		List<NavigationItem> items = new ArrayList<NavigationItem>();
		items.add(SimpleNavigationItem.builder()
				.title("Example Module")
				.cssClassName("fa fa-cube")
				.linkTo(UI_ROUTE_PATH)
				.build());
		return items;
	}
	
	@Override
	public List<UIRoute> getUIRoutes() {
		// Adding a sidebar navigation item to the UI route/component we're providing
		List<UIRoute> items = new ArrayList<UIRoute>();
		items.add(SimpleUIRoute.builder()
				.path(UI_ROUTE_PATH)
				.jsComponentClass("ExampleModuleComponent") // the JS class we are packaging as a module. The object name is managed in the webpack config
				.build());
		return items;
	}
	
	@Override
	public List<String> getScriptResources() {
		// The location of this script is determined by our package.json config
		return Arrays.asList("/plugins/example/index.min.js"); 
	}
	
	public static String asString(Resource resource) throws IOException {
		Reader reader = new InputStreamReader(resource.getInputStream());
		return FileCopyUtils.copyToString(reader);
    }
}