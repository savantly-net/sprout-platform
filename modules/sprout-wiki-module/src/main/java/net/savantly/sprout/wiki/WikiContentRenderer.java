package net.savantly.sprout.wiki;

import java.io.StringWriter;

import net.savantly.sprout.content.contentItem.ContentItemRenderer;
import net.savantly.sprout.core.content.contentItem.ContentItem;

public class WikiContentRenderer implements ContentItemRenderer{

	@Override
	public int getPriority() {
		return 1;
	}

	@Override
	public boolean render(ContentItem item, StringWriter writer) {
		if (item.getContentType().getId().equals(WikiFixture.DEFAULT_CONTENT_TYPE_NAME)) {
			writer.write("WOOHOO!!");
			return true;
		}
		return false;
	}

}
