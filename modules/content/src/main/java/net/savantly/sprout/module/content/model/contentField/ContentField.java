package net.savantly.sprout.module.content.model.contentField;

import net.savantly.sprout.core.domain.metadata.MetaDataContainer;
import net.savantly.sprout.module.content.model.fieldType.FieldType;

public interface ContentField extends MetaDataContainer<String> {
	
	String getName();
	String getId();
	FieldType getFieldType();
	boolean isRequired();
	int getSortOrder();
	String getDisplayName();

}