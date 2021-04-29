package net.savantly.sprout.domain.widget.data.impl;

import java.util.Collection;
import java.util.Optional;

import net.savantly.sprout.domain.widget.data.WidgetData;
import net.savantly.sprout.domain.widget.data.WidgetDataProvider;
import net.savantly.sprout.domain.widget.dataSource.impl.DefaultWidgetDataSource;

/**
 * A default data provider that allows arbitrary classes to register data 
 * 
 * @author jeremy branham
 *
 */
public class DefaultWidgetDataProvider implements WidgetDataProvider {

	final DefaultWidgetDataRegistration registration;
	
	public DefaultWidgetDataProvider(DefaultWidgetDataRegistration registration) {
		this.registration = registration;
	}

	@Override
	public String getWidgetDataSourceType() {
		return DefaultWidgetDataSource.DEFAULT_WIDGET_DATA_SOURCE;
	}

	@Override
	public Optional<WidgetData> getDataById(String id) {
		if (registration.containsKey(id)) {
			return Optional.of(registration.get(id));
		} else {
			return Optional.empty();
		}
	}

	@Override
	public Collection<WidgetData> getDataList() {
		return registration.values();
	}
	
}
