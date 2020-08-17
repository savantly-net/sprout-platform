package net.savantly.sprout.module.content.model.contentType;

import java.util.List;

import net.savantly.sprout.module.content.model.contentField.ContentField;

public interface ContentType {
	
	String getId();
	String getName();
	String getDescription();
	List<ContentField> getFields();
	boolean isRequiresTemplate();
	boolean isUpdateable();
	String getIcon();

}
