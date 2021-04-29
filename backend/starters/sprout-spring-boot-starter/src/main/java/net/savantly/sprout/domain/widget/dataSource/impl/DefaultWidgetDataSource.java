package net.savantly.sprout.domain.widget.dataSource.impl;

import net.savantly.sprout.domain.widget.dataSource.WidgetDataSource;

public class DefaultWidgetDataSource implements WidgetDataSource {
	
	public static final String DEFAULT_WIDGET_DATA_SOURCE = "DEFAULT_WIDGET_DATA_SOURCE";

	@Override
	public String getWidgetDataSourceType() {
		return DEFAULT_WIDGET_DATA_SOURCE;
	}

	@Override
	public String getDisplayName() {
		return "Default";
	}

}
