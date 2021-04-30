package net.savantly.sprout.domain.widget.data.resource;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.util.StreamUtils;

import net.savantly.sprout.domain.widget.data.WidgetDataType;
import net.savantly.sprout.domain.widget.data.impl.SimpleWidgetData;

public class ResourceWidgetDataFactory {

	private static final Logger log = LoggerFactory.getLogger(ResourceWidgetDataFactory.class);
	
	private final ResourceLoader resourceLoader;
	
	public ResourceWidgetDataFactory(ResourceLoader resourceLoader) {
		this.resourceLoader = resourceLoader;
	}
	
	public SimpleWidgetData createResourceWidgetData(String id, String name, WidgetDataType dataType, String resourcePath) {
		return new SimpleWidgetData()
			.setId(id)
			.setName(name)
			.setDataType(dataType)
			.setDataSupplier(() -> {
				return resourceToBytes(this.resourceLoader.getResource(resourcePath));
			});
	}
	
	private byte[] resourceToBytes(Resource resource) {
		try {
			return StreamUtils.copyToByteArray(resource.getInputStream());
		} catch (IOException e) {
			log.error("trouble serving the file: {}", resource.getFilename());
			return "error: check logs".getBytes();
		}
	}
}