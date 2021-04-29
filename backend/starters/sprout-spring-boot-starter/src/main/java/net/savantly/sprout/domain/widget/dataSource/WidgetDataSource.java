package net.savantly.sprout.domain.widget.dataSource;

import net.savantly.sprout.domain.widget.data.WidgetDataType;

public interface WidgetDataSource {
	
	/**
	 * Identify what type of data is produced by this data source
	 * @return
	 */
	default WidgetDataType getSourceType() {
		return WidgetDataType.MARKDOWN;
	}
	
	/**
	 * The unique widget data source type of this data source provider<br>
	 * One or more WidgetDataProvider beans can provide data identified by this data source
	 * @return
	 */
	String getWidgetDataSourceType();
	
	/**
	 * The friendly display name of this data source
	 * @return
	 */
	String getDisplayName();

}
