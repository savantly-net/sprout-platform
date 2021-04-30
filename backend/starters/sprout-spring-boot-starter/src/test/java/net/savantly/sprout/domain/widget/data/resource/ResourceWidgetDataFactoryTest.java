package net.savantly.sprout.domain.widget.data.resource;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.DefaultResourceLoader;

import net.savantly.sprout.domain.widget.data.WidgetDataType;
import net.savantly.sprout.domain.widget.data.impl.SimpleWidgetData;

public class ResourceWidgetDataFactoryTest {
	

	@Test
	public void testExistingResource() {
		ResourceWidgetDataFactory fac = new ResourceWidgetDataFactory(new DefaultResourceLoader());
		
		String id = "id";
		String name = "name";
		WidgetDataType dataType = WidgetDataType.MARKDOWN;
		String resourcePath = "classpath:/templates/index.html";
		
		SimpleWidgetData data = fac.createResourceWidgetData(id, name, dataType, resourcePath);

		Assertions.assertEquals(id, data.getId());
		Assertions.assertEquals(name, data.getName());
		Assertions.assertEquals(dataType, data.getDataType());
		
		Assertions.assertEquals("The Root Index Page", data.getDataSupplier().get());
	}
	
	@Test
	public void testMissingResource() {
		ResourceWidgetDataFactory fac = new ResourceWidgetDataFactory(new DefaultResourceLoader());
		
		String id = "id";
		String name = "name";
		WidgetDataType dataType = WidgetDataType.MARKDOWN;
		String resourcePath = "classpath:/templates/idontexist";
		
		SimpleWidgetData data = fac.createResourceWidgetData(id, name, dataType, resourcePath);

		Assertions.assertEquals(id, data.getId());
		Assertions.assertEquals(name, data.getName());
		Assertions.assertEquals(dataType, data.getDataType());
		
		Assertions.assertTrue(((String)data.getDataSupplier().get()).contains("error"));
	}
}
