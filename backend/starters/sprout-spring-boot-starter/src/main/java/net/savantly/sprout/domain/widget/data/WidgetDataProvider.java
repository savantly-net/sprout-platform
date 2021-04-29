package net.savantly.sprout.domain.widget.data;

import java.util.Collection;
import java.util.Optional;

/**
 * Implementations provide widget data for API consumers.
 * 
 * @author jeremy branham
 *
 */
public interface WidgetDataProvider {

	/**
	 * The identifier of the WidgetDataSource this provider can supply data for
	 * @return
	 */
	String getWidgetDataSourceType();
	
	/**
	 * Gets a single widget data item by the unique identifier
	 * @param id The unique identifier of one data item 
	 * @return
	 */
	Optional<WidgetData> getDataById(String id);
	
	/**
	 * Gets a lightweight list of data available from this provider;
	 * @return
	 */
	Collection<WidgetDataListItem> getDataList();
}
