package net.savantly.sprout.domain.widget.data.impl;

import java.util.function.Supplier;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import net.savantly.sprout.domain.widget.data.WidgetData;
import net.savantly.sprout.domain.widget.data.WidgetDataType;

@Getter
@Setter
@Accessors(chain = true)
public class SimpleWidgetData implements WidgetData {

	private String id;
	private String name;
	private WidgetDataType dataType;
	private Supplier<Object> dataSupplier;
}
