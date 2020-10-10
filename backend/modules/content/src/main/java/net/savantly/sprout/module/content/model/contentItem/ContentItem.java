package net.savantly.sprout.module.content.model.contentItem;

import java.util.Map;

public interface ContentItem {

	String getId();
	String getName();
	String getDescription();
	Map<String, String> getFieldValues();
}
