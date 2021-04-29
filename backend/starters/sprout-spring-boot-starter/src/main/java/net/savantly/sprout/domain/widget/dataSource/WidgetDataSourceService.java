package net.savantly.sprout.domain.widget.dataSource;

import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class WidgetDataSourceService {
	
	private List<WidgetDataSource> sources;
	
	public WidgetDataSourceService(List<WidgetDataSource> widgetDataSources) {
		this.sources = widgetDataSources;
	}

	public Collection<WidgetDataSource> getDataSources() {
		Collections.sort(sources, Comparator.comparing(WidgetDataSource::getDisplayName));
		return sources;
	}

}
