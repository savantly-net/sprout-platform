package net.savantly.sprout.domain.widget.data;

import java.util.Collection;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/widget-data")
public class WidgetDataApi {

	private final WidgetDataService service;
	
	public WidgetDataApi(WidgetDataService service) {
		this.service = service;
	}
	
	@GetMapping("/{widgetDataSourceType}")
	public Collection<WidgetDataListItem> getDataList(@PathVariable("widgetDataSourceType") String widgetDataSourceType) {
		return service.getDataList(widgetDataSourceType);
	}
	
	@GetMapping("/{widgetDataSourceType}/{widgetDataId}")
	public Optional<WidgetData> getDataList(
			@PathVariable("widgetDataSourceType") String widgetDataSourceType,
			@PathVariable("widgetDataId") String widgetDataId) {
		return service.getDataById(widgetDataId, widgetDataSourceType);
	}
	
}
