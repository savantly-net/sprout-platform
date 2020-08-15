package net.savantly.sprout.module.content.model.contentField;

import net.savantly.sprout.module.content.model.fieldType.FieldType;

public interface ContentField {
	
	String getId();
	String getName();
	FieldType getFieldType();
	boolean isRequired();
	int getSortOrder();
	String getDisplayName();

}