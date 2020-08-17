package net.savantly.sprout.module.content.model.contentField;

import java.util.Map;

import net.savantly.sprout.module.content.model.fieldType.FieldType;

public interface ContentField {
	
	String getName();
	String getId();
	FieldType getFieldType();
	boolean isRequired();
	int getSortOrder();
	String getDisplayName();
	Map<String, String> getMetaData();

}