package net.savantly.sprout.core.module.web;

/**
 * A navigation item that is displayed in the Sprout Admin application
 *
 */
public interface NavigationItem {

	/**
	 * The title of the navigation item
	 * @return
	 */
	String getTitle();
	
	/**
	 * The CSS class name that's typically used to display an icon for the navigation item
	 * @return
	 */
	String getCssClassName();
	
	/**
	 * The 'route' in the admin UI that this item should navigate to
	 * @return
	 */
	String getLinkTo();
}
