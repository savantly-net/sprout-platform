package net.savantly.sprout.module.content.model.contentItem;

import java.io.StringWriter;

public interface ContentItemRenderer {

	int getPriority();
	boolean render(ContentItem item, StringWriter writer);

}