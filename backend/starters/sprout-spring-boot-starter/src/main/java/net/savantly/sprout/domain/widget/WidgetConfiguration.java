package net.savantly.sprout.domain.widget;

import java.util.Collection;
import java.util.List;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.sprout.domain.widget.data.WidgetDataApi;
import net.savantly.sprout.domain.widget.data.WidgetDataProvider;
import net.savantly.sprout.domain.widget.data.WidgetDataService;
import net.savantly.sprout.domain.widget.dataSource.WidgetDataSource;
import net.savantly.sprout.domain.widget.dataSource.WidgetDataSourceApi;
import net.savantly.sprout.domain.widget.dataSource.WidgetDataSourceService;

@Configuration
public class WidgetConfiguration {

	@Bean
	@ConditionalOnMissingBean
	public WidgetDataSourceService defaultWidgetDataSourceService(List<WidgetDataSource> widgetDataSources) {
		return new WidgetDataSourceService(widgetDataSources);
	}
	@Bean
	@ConditionalOnMissingBean
	public WidgetDataSourceApi defaultWidgetDataSourceApi(WidgetDataSourceService service) {
		return new WidgetDataSourceApi(service);
	}
	
	@Bean
	@ConditionalOnMissingBean
	public WidgetDataService defaultWidgetDataService(Collection<WidgetDataProvider> dataProviders) {
		return new WidgetDataService(dataProviders);
	}
	
	@Bean
	@ConditionalOnMissingBean
	public WidgetDataApi defaultWidgetDataApi(WidgetDataService service) {
		return new WidgetDataApi(service);
	}

}
