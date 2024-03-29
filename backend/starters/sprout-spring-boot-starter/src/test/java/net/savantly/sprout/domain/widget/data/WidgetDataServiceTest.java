package net.savantly.sprout.domain.widget.data;

import java.util.Collection;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import net.savantly.sprout.domain.widget.WidgetConfiguration;
import net.savantly.sprout.domain.widget.data.WidgetData;
import net.savantly.sprout.domain.widget.data.WidgetDataService;
import net.savantly.sprout.domain.widget.data.WidgetDataType;
import net.savantly.sprout.domain.widget.data.impl.DefaultWidgetDataRegistration;
import net.savantly.sprout.domain.widget.data.impl.SimpleWidgetData;
import net.savantly.sprout.domain.widget.dataSource.impl.DefaultWidgetDataSource;
import net.savantly.sprout.starter.freemarker.FreemarkerConfiguration;

@SpringJUnitConfig(classes = {FreemarkerConfiguration.class, WidgetConfiguration.class, FreeMarkerAutoConfiguration.class})
public class WidgetDataServiceTest {

	@Autowired
	DefaultWidgetDataRegistration registration;
	@Autowired
	WidgetDataService service;
	
	@Test
	public void testRegistration() {
		WidgetData widgetData = new SimpleWidgetData()
			.setId("id")
			.setDataType(WidgetDataType.MARKDOWN)
			.setName("name")
			.setDataSupplier(() -> "#TITLE");
		
		registration.put(widgetData );
		
		Collection<WidgetData> res = service.getDataList(DefaultWidgetDataSource.DEFAULT_WIDGET_DATA_SOURCE);
		Assertions.assertEquals(2, res.size(), "the built-in widget + the new widget");
		WidgetData item = res.stream().filter(w -> w.getId().contentEquals(widgetData.getId())).findFirst().get();
		Assertions.assertEquals(widgetData, item);
		Assertions.assertEquals("id", item.getId());
		Assertions.assertEquals(WidgetDataType.MARKDOWN, item.getDataType());
		Assertions.assertEquals("name", item.getName());
		Assertions.assertEquals("#TITLE", item.getDataSupplier().get());
	}
}
