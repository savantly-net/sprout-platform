package net.savantly.sprout.domain.widget.data.impl;

import java.util.HashMap;

import net.savantly.sprout.domain.widget.data.WidgetData;

public class DefaultWidgetDataRegistration extends HashMap<String, WidgetData> {

	public void registerWidgetData(WidgetData widgetData) {
		this.put(widgetData.getId(), widgetData);
	}

}
