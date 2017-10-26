package net.savantly.sprout.core.content.webPageContent;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

import net.savantly.sprout.core.content.contentItem.ContentItem;

@Projection(name="fullWebPageContent", types= {WebPageContent.class})
public interface FullWebPageContent {
	String getId();
	String getPlaceHolderId();
	boolean isNew();
	Set<ContentItem> getContentItems();
	
}
