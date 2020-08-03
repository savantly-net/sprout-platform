package net.savantly.sprout.module.content.model.webPageContent;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

import net.savantly.sprout.module.content.model.contentItem.ContentItem;

@Projection(name="fullWebPageContent", types= {WebPageContent.class})
public interface FullWebPageContent {
	String getId();
	String getPlaceHolderId();
	boolean isNew();
	Set<ContentItem> getContentItems();
	
}
