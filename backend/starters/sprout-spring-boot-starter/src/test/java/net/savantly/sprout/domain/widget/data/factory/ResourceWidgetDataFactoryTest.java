package net.savantly.sprout.domain.widget.data.factory;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import net.savantly.sprout.domain.widget.WidgetConfiguration;
import net.savantly.sprout.domain.widget.data.WidgetDataType;
import net.savantly.sprout.domain.widget.data.impl.SimpleWidgetData;
import net.savantly.sprout.starter.freemarker.FreemarkerConfiguration;

@SpringJUnitConfig(classes = {FreemarkerConfiguration.class, WidgetConfiguration.class, FreeMarkerAutoConfiguration.class})
public class ResourceWidgetDataFactoryTest {
	
	@Autowired
	ResourceWidgetDataFactory fac;

	@Test
	public void testExistingResource() {
		
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
	
	@Test
	public void testViewRender() {
		
		String id = "id";
		String name = "name";
		WidgetDataType dataType = WidgetDataType.MARKDOWN;
		String viewName = "freemarker.html"; // classpath:/templates/freemarker.html
		
		// Setup model for template
		Map<String, Object> model = new HashMap<>();
		String value = "# Hello World";
		model.put("value", value);
		Map<String, Object> complex = new HashMap<>();
		String complexValue = "I'm here";
		complex.put("value", complexValue);
		model.put("complex", complex);
		
		SimpleWidgetData data = fac.createWidgetDataFromView(id, name, dataType, viewName, model);

		Assertions.assertEquals(id, data.getId());
		Assertions.assertEquals(name, data.getName());
		Assertions.assertEquals(dataType, data.getDataType());
		
		String result = (String)data.getDataSupplier().get();
		Assertions.assertTrue(result.contains(value));
		Assertions.assertTrue(result.contains(complexValue));
	}
	
}
