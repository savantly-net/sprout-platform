package net.savantly.sprout.domain.widget.data;

/**
 * A lightweight  data list for API consumers
 * @author jeremy branham
 *
 */
public interface WidgetDataListItem {

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
}
