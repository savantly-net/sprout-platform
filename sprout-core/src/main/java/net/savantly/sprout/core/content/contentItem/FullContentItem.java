package net.savantly.sprout.core.content.contentItem;

import java.util.Map;

import org.springframework.data.rest.core.config.Projection;

import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplate;
import net.savantly.sprout.core.content.contentType.ContentType;

@Projection(name = "FullContentItem", types = { ContentItem.class }) 
public interface FullContentItem {

	String getId();
	String getName();
	ContentType getContentType();
	Map<ContentField, String> getFieldValues();
	ContentTemplate getTemplate();
	boolean isNew();
}
