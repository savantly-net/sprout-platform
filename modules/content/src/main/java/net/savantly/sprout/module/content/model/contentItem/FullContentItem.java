package net.savantly.sprout.module.content.model.contentItem;

import java.util.Map;

import org.springframework.data.rest.core.config.Projection;

import net.savantly.sprout.module.content.model.contentField.ContentField;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplate;
import net.savantly.sprout.module.content.model.contentType.ContentType;

@Projection(name = "FullContentItem", types = { ContentItem.class }) 
public interface FullContentItem {

	String getId();
	String getName();
	ContentType getContentType();
	Map<ContentField, String> getFieldValues();
	ContentTemplate getTemplate();
	boolean isNew();
}
