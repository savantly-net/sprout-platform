package net.savantly.sprout.domain.widget.data;

import java.util.Collection;
import java.util.Optional;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.sprout.starter.problem.EntityNotFoundProblem;

@RestController
@RequestMapping("/api/widget-data")
public class WidgetDataApi {

	private final WidgetDataService service;
	
	public WidgetDataApi(WidgetDataService service) {
		this.service = service;
	}
	
	@GetMapping("/{widgetDataSourceType}")
	public Collection<WidgetData> getDataList(@PathVariable("widgetDataSourceType") String widgetDataSourceType) {
		return service.getDataList(widgetDataSourceType);
	}
	
	@GetMapping("/{widgetDataSourceType}/{widgetDataId}")
	public ResponseEntity<Object> getDataList(
			@PathVariable("widgetDataSourceType") String widgetDataSourceType,
			@PathVariable("widgetDataId") String widgetDataId) {
		final Optional<WidgetData> widgetData = service.getDataById(widgetDataId, widgetDataSourceType);
		if (widgetData.isPresent()) {
			final WidgetData d = widgetData.get();
			return ResponseEntity.ok()
				.contentType(determineContentType(d.getDataType()))
				.header("widget-id", d.getId())
				.header("widget-name", d.getName())
				.build();

		} else {
			throw new EntityNotFoundProblem(widgetDataSourceType, widgetDataId);
		}
	}

	private MediaType determineContentType(WidgetDataType dataType) {
		switch (dataType) {
		case JSON:
			return MediaType.APPLICATION_JSON;
		case MARKDOWN:
			return MediaType.TEXT_MARKDOWN;
		case MARKUP: 
			return MediaType.TEXT_HTML;
		default:
			return MediaType.TEXT_HTML;
		}
	}
	
}
