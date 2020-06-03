package net.savantly.sprout.core.module;

import java.util.Collections;
import java.util.List;

import net.savantly.sprout.core.module.web.NavigationItem;
import net.savantly.sprout.core.module.web.UIRoute;

/**
 * A specialized SproutModule that provides a way to modify the Admin User Interface<br>
 * The Admin UI executes the provided resources in this order - <br>
 * {@link #getScriptResources()}<br>
 * {@link #getUIRoutes()}<br>
 * {@link #getNavigationItems()}<br>
 *
 */
@SuppressWarnings("unchecked")
public interface SproutWebModule extends SproutModule {

	/**
	 * This method should return browser markup. <br>
	 * The markup is rendered in the Sprout admin panel, and may be used to interact with the module's rest controllers or other APIs.  <br>
	 * <br>
	 * For more complex integration, consider creating a React Component library bundle in UMD format and/or provide UIRoutes and NavigationItems <br>
	 * <br>
	 * See - <br>
	 * {@link #getScriptResources()}<br>
	 * {@link #getNavigationItems()}<br>
	 * {@link #getUIRoutes()}<br>
	 * 
	 * @return
	 * HTML for rendering in the admin UI
	 */
	default String getAdminPanelMarkup() {
		return String.format("<h1>%s</h1>", getName());
	}
	
	/**
	 * Modules can modify the Admin app navigation/menu by including a list of <code>NavigationItem</code>
	 * @return
	 */
	default List<NavigationItem> getNavigationItems(){
		return Collections.EMPTY_LIST;
	}
	
	/**
	 * Modules can provide the Admin app 'routes' by including a list of <code>UIRoute</code>
	 * The jsComponentClass is constructed and the resulting output is attached to the DOM
	 * @return
	 */
	default List<UIRoute> getUIRoutes(){
		return Collections.EMPTY_LIST;
	}
	
	/**
	 * Modules can provide script resources to the Admin app
	 * The scripts are loaded in the UI after the default Admin app scripts
	 * Script resources should be bundled in UMD format - like a React Component Library
	 * @return
	 */
	default List<String> getScriptResources(){
		return Collections.EMPTY_LIST;
	}
}
