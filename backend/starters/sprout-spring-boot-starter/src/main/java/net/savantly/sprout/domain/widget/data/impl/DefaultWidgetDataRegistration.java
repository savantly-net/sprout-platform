package net.savantly.sprout.domain.widget.data.impl;

import java.util.HashMap;
import java.util.Map;

import net.savantly.sprout.domain.widget.data.WidgetData;
import net.savantly.sprout.domain.widget.data.WidgetDataType;
import net.savantly.sprout.domain.widget.data.factory.ResourceWidgetDataFactory;

/**
 * Register widget data for the DefaultWidgetDataProvider
 * @author jeremy branham
 *
 */
public class DefaultWidgetDataRegistration extends HashMap<String, WidgetData> {
	
	private static final long serialVersionUID = 1L;
	private final ResourceWidgetDataFactory resourceDataFactory;
	
	public DefaultWidgetDataRegistration(ResourceWidgetDataFactory resourceDataFactory) {
		this.resourceDataFactory = resourceDataFactory;
	}
	
	/**
	 * Convenience method for adding a widget that is a resource.<br>
	 * @param id
	 * @param name
	 * @param dataType
	 * @param resourcePath
	 */
	public void put(String id, String name, WidgetDataType dataType, String resourcePath) {
		put(this.resourceDataFactory.createResourceWidgetData(id, name, dataType, resourcePath));
	}
	

	/**
	 * Convenience method for adding a widget that uses a registered view + model<br> 
	 * The view must be registered to use it here. <br>
	 * This happens automatically if the template file is placed in an expected location.<br>
	 * <br>
	 * @param id The ID of the widget
	 * @param name The display name of the widget
	 * @param dataType The type of data the widget returns
	 * @param viewName The name of the view to render
	 * @param model The model that's applied to the view
	 */
	public void put(String id, String name, WidgetDataType dataType, String viewName, Map<String, Object> model) {
		put(this.resourceDataFactory.createWidgetDataFromView(id, name, dataType, viewName, model));
	}

	/**
	 * Add widget data to the registry
	 * @param widgetData
	 */
	public void put(WidgetData widgetData) {
		this.put(widgetData.getId(), widgetData);
	}

}
