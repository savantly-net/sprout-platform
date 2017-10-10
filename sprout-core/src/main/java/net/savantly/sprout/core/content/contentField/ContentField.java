package net.savantly.sprout.core.content.contentField;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import net.savantly.sprout.core.content.contentType.ContentType;
import net.savantly.sprout.core.content.fieldType.FieldType;
import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
@Table(name="CONTENT_FIELD")
public class ContentField extends PersistedDomainObject{
	
	private String name;
	private FieldType fieldType;
	private boolean required;
	private int sortOrder;
	private String displayName;
	private ContentType contentType;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public FieldType getFieldType() {
		return fieldType;
	}

	public void setFieldType(FieldType fieldType) {
		this.fieldType = fieldType;
	}

	public boolean isRequired() {
		return required;
	}

	public void setRequired(boolean required) {
		this.required = required;
	}

	public int getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(int order) {
		this.sortOrder = order;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	@ManyToOne
	public ContentType getContentType() {
		return contentType;
	}

	public void setContentType(ContentType contentType) {
		this.contentType = contentType;
	}

}
