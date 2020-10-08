package net.savantly.sprout.core.module;

import java.util.Collections;
import java.util.List;

import net.savantly.sprout.core.module.web.NavigationItem;
import net.savantly.sprout.core.module.web.UIRoute;

/**
 * A specialized SproutModule that provides a way to modify the User Interface<br>
 * The UI executes the provided resources in this order - <br>
 * {@link #getScriptResources()}<br>
 * {@link #getUIRoutes()}<br>
 * {@link #getNavigationItems()}<br>
 *
 */
@SuppressWarnings("unchecked")
public interface SproutWebModule extends SproutModule {

	/**
	 * This method should return browser markup. <br>
	 * The markup is rendered in the plugin information panel, and may be used to interact with the module's rest controllers or other APIs.  <br>
	 * <br>
	 * For more complex integration, consider creating a React Component library bundle in UMD format and/or provide UIRoutes and NavigationItems <br>
	 * <br>
	 * See - <br>
	 * {@link #getScriptResources()}<br>
	 * {@link #getNavigationItems()}<br>
	 * {@link #getUIRoutes()}<br>
	 * 
	 * @return
	 * HTML for rendering in the UI
	 */
	default String getPluginInformationMarkup() {
		return String.format("<h1>%s</h1>", getName());
	}
	
	/**
	 * Modules can modify the UI navigation/menu by including a list of <code>NavigationItem</code>
	 * @return
	 */
	default List<NavigationItem> getNavigationItems(){
		return Collections.EMPTY_LIST;
	}
	
	/**
	 * Modules can provide the UI 'routes' by including a list of <code>UIRoute</code>
	 * The JavaScript Module is lazy loaded when the route is accessed
	 * @return
	 */
	default List<UIRoute> getUIRoutes(){
		return Collections.EMPTY_LIST;
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
