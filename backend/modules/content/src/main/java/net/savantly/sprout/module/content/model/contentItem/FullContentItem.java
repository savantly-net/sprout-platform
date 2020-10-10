package net.savantly.sprout.module.content.model.contentItem;

import java.util.Map;

import org.springframework.data.rest.core.config.Projection;

import net.savantly.sprout.module.content.model.contentField.ContentFieldImpl;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplate;
import net.savantly.sprout.module.content.model.contentType.ContentTypeImpl;

@Projection(name = "FullContentItem", types = { ContentItemImpl.class }) 
public interface FullContentItem {

	String getId();
	String getName();
	ContentTypeImpl getContentType();
	Map<ContentFieldImpl, String> getFieldValues();
	ContentTemplate getTemplate();
	boolean isNew();
}
