package net.savantly.sprout.module.content.model.contentItem;

import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplate;

public interface TemplatedContentItem extends ContentItem {

	ContentTemplate getTemplate();
}
