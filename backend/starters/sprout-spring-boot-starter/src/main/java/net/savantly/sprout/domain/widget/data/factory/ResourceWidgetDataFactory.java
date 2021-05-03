package net.savantly.sprout.domain.widget.data.factory;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Map;
import java.util.function.Supplier;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.util.StreamUtils;

import net.savantly.sprout.domain.widget.data.WidgetData;
import net.savantly.sprout.domain.widget.data.WidgetDataType;
import net.savantly.sprout.domain.widget.data.impl.SimpleWidgetData;
import net.savantly.sprout.starter.template.TemplateRenderer;

/**
 * A class with factory methods to produce WidgetData from Resources
 * 
 * @author jeremy branham
 *
 */
public class ResourceWidgetDataFactory {

	private static final Logger log = LoggerFactory.getLogger(ResourceWidgetDataFactory.class);
	
	private final ResourceLoader resourceLoader;
	private final TemplateRenderer renderer;
	
	public ResourceWidgetDataFactory(ResourceLoader resourceLoader, TemplateRenderer renderer) {
		this.resourceLoader = resourceLoader;
		this.renderer = renderer;
	}
	
	/**
	 * Create a {@link WidgetData} from a {@link Resource} URI 
	 * 
	 * @param id The ID to use for this WidgetData
	 * @param name The name to display for this WidgetData
	 * @param dataType The {@link WidgetDataType} this WidgetData supplies
	 * @param resourcePath The URI string of the Resource to use for this WidgetData data supplier
	 * @return A new <code>WidgetData</code>
	 */
	public SimpleWidgetData createResourceWidgetData(String id, String name, WidgetDataType dataType, String resourcePath) {
		return new SimpleWidgetData()
			.setId(id)
			.setName(name)
			.setDataType(dataType)
			.setDataSupplier(() -> {
				return resourceToString(this.resourceLoader.getResource(resourcePath));
			});
	}
	
	/**
	 * Create a {@link WidgetData} from a {@link Resource} URI<br>
	 * Uses the default {@link TemplateRenderer}
	 * 
	 * @param id The ID to use for this WidgetData
	 * @param name The name to display for this WidgetData
	 * @param dataType The {@link WidgetDataType} this WidgetData supplies
	 * @param templateName The name of the view to lookup and apply the model to
	 * @param model The model to apply for rendering.
	 * @return A new <code>WidgetData</code>
	 */
	public SimpleWidgetData createWidgetDataFromView(String id, String name, WidgetDataType dataType, String templateName, Map<String, Object> model) {
		return new SimpleWidgetData()
			.setId(id)
			.setName(name)
			.setDataType(dataType)
			.setDataSupplier(() -> {
				return this.renderer.render(templateName, model);
			});
	}
	
	/**
	 * Create a {@link WidgetData} from a {@link Resource} URI<br>
	 * Uses the default {@link TemplateRenderer}
	 * 
	 * @param id The ID to use for this WidgetData
	 * @param name The name to display for this WidgetData
	 * @param dataType The {@link WidgetDataType} this WidgetData supplies
	 * @param templateName The name of the view to lookup and apply the model to
	 * @param modelSupplier A supplier for the model to apply for rendering. Allows the model to be calculated per request.
	 * @return A new <code>WidgetData</code>
	 */
	public SimpleWidgetData createWidgetDataFromView(String id, String name, WidgetDataType dataType, String templateName, Supplier<Map<String, Object>> modelSupplier) {
		return new SimpleWidgetData()
			.setId(id)
			.setName(name)
			.setDataType(dataType)
			.setDataSupplier(() -> {
				return this.renderer.render(templateName, modelSupplier.get());
			});
	}
	
	private String resourceToString(Resource resource) {
		try {
			return StreamUtils.copyToString(resource.getInputStream(), Charset.defaultCharset());
		} catch (IOException e) {
			log.error("trouble serving the file: {}", resource.getFilename());
			return "error: check logs";
		}
	}
}