package net.savantly.sprout.domain.widget.data.impl;

import java.util.HashMap;

import net.savantly.sprout.domain.widget.data.WidgetData;
import net.savantly.sprout.domain.widget.data.WidgetDataType;
import net.savantly.sprout.domain.widget.data.resource.ResourceWidgetDataFactory;

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
	 * Convenience method for adding data from properties.<br>
	 * It constructs a WidgetData internally.
	 * @param id
	 * @param name
	 * @param dataType
	 * @param resourcePath
	 */
	public void fromResource(String id, String name, WidgetDataType dataType, String resourcePath) {
		registerWidgetData(this.resourceDataFactory.createResourceWidgetData(id, name, dataType, resourcePath));
	}

	/**
	 * Add widget data to the registry
	 * @param widgetData
	 */
	public void registerWidgetData(WidgetData widgetData) {
		this.put(widgetData.getId(), widgetData);
	}

}
