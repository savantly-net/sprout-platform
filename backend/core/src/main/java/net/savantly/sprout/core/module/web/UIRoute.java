package net.savantly.sprout.core.module.web;

public interface UIRoute {

	/**
	 * The path in the UI that is bound to this route
	 * @return
	 */
	String getPath();
	
	/**
	 * The JavaScript Module that is loaded by this route
	 * @return
	 */
	String getJsModulePath();
}
