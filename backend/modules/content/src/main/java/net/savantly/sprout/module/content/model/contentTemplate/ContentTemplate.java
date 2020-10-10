package net.savantly.sprout.module.content.model.contentTemplate;

import java.util.Set;

import net.savantly.sprout.module.content.model.contentItem.ContentItem;

public interface ContentTemplate {
	
	String getId();

	String getName();

	String getDescription();

	String getContent();

	Set<ContentItem> getContentItems();

}