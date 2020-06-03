package net.savantly.sprout.core.module.web;

public interface UIRoute {

	/**
	 * The path in the admin UI that is bound to this route
	 * @return
	 */
	String getPath();
	
	/**
	 * The React Component that is loaded by this route
	 * @return
	 */
	String getJsComponentClass();
}
