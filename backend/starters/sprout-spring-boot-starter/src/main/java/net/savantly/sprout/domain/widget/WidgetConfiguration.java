package net.savantly.sprout.domain.widget;

import java.util.Collection;
import java.util.List;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import net.savantly.sprout.domain.widget.data.WidgetDataApi;
import net.savantly.sprout.domain.widget.data.WidgetDataProvider;
import net.savantly.sprout.domain.widget.data.WidgetDataService;
import net.savantly.sprout.domain.widget.data.impl.DefaultWidgetDataProvider;
import net.savantly.sprout.domain.widget.data.impl.DefaultWidgetDataRegistration;
import net.savantly.sprout.domain.widget.dataSource.WidgetDataSource;
import net.savantly.sprout.domain.widget.dataSource.WidgetDataSourceApi;
import net.savantly.sprout.domain.widget.dataSource.WidgetDataSourceService;
import net.savantly.sprout.domain.widget.dataSource.impl.DefaultWidgetDataSource;

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

	@Bean
	public WidgetDataSource defaultWidgetDataSource() {
		return new DefaultWidgetDataSource();
	}
	
	@Bean
	public DefaultWidgetDataRegistration defaultWidgetDataRegistration() {
		return new DefaultWidgetDataRegistration();
	}
	
	@Bean
	@Primary
	public WidgetDataProvider defaultWidgetDataProvider(DefaultWidgetDataRegistration registration) {
		return new DefaultWidgetDataProvider(registration);
	}
}
