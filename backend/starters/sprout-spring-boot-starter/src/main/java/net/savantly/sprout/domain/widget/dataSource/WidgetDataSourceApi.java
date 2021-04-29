package net.savantly.sprout.domain.widget.dataSource;

import java.util.Collection;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/widget-data-source")
public class WidgetDataSourceApi {
	
	private final WidgetDataSourceService service;

	public WidgetDataSourceApi(WidgetDataSourceService service) {
		this.service = service;
	}
	
	@GetMapping
	public Collection<WidgetDataSource> getDataSources() {
		return service.getDataSources();
	}
}
