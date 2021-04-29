package net.savantly.sprout.domain.widget.data;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class WidgetDataService {
	
	private final Map<String, WidgetDataProvider> providers;
	
	public WidgetDataService(Collection<WidgetDataProvider> dataProviders) {
		this.providers = new HashMap();
		for (WidgetDataProvider widgetDataProvider : dataProviders) {
			this.providers.put(widgetDataProvider.getWidgetDataSourceType(), widgetDataProvider);
		}
	}

	public Optional<WidgetData> getDataById(String id, String widgetDataSourceType) {
		if(this.providers.containsKey(widgetDataSourceType)) {
			return this.providers.get(widgetDataSourceType).getDataById(id);
		} else {
			return Optional.empty();
		}
	}
	
	public Collection<WidgetData> getDataList(String widgetDataSourceType) {
		if(this.providers.containsKey(widgetDataSourceType)) {
			return this.providers.get(widgetDataSourceType).getDataList();
		} else {
			return Collections.EMPTY_LIST;
		}
	}
}
