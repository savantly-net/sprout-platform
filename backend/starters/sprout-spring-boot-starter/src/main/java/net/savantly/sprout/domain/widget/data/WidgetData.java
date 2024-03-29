package net.savantly.sprout.domain.widget.data;

import java.util.function.Supplier;

/**
 * Implementations provide a generalized payload of data, that can be consumed by API callers.<br>
 * Especially from web front ends, where the data may be rendered or otherwise consumed.<br>
 * But the data may be consumed from by other services.
 */
public interface WidgetData {

	/**
	 * Unique identifier of the widget data
	 * @return
	 */
	String getId();
	
	/**
	 * Friendly display name of the widget data
	 * @return
	 */
	String getName();
	
	/**
	 * The type of data provided
	 * @return
	 */
	WidgetDataType getDataType();
	
	/**
	 * A supplier of the actual data 
	 * @return
	 */
	Supplier<Object> getDataSupplier();
}
