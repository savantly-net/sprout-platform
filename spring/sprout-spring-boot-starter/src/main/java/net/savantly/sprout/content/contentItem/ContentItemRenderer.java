package net.savantly.sprout.content.contentItem;

import java.io.StringWriter;

import net.savantly.sprout.core.content.contentItem.ContentItem;

public interface ContentItemRenderer {

	int getPriority();
	boolean render(ContentItem item, StringWriter writer);

}