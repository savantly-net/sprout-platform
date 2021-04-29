package net.savantly.sprout.domain.widget.dataSource;

public interface WidgetDataSource {
	
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
