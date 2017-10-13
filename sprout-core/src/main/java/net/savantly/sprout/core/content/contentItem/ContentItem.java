package net.savantly.sprout.core.content.contentItem;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapKeyColumn;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.content.contentField.ContentFieldKeyDeserializer;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplate;
import net.savantly.sprout.core.content.contentType.ContentType;
import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
public class ContentItem extends PersistedDomainObject{
	
	private String name;
	private ContentType contentType;
	private Map<ContentField, String> fieldValues = new HashMap<>();
	private ContentTemplate template;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@ManyToOne
	public ContentType getContentType() {
		return contentType;
	}

	public void setContentType(ContentType contentType) {
		this.contentType = contentType;
	}

	@ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name = "FIELD_VALUES", joinColumns = @JoinColumn(name = "CONTENT_ITEM_ID"))
	@MapKeyColumn(name="CONTENT_FIELD_ID")
	@Column(name = "CONTENT_FIELD_VALUE")
	@JsonDeserialize(keyUsing=ContentFieldKeyDeserializer.class)
	public Map<ContentField, String> getFieldValues() {
		return fieldValues;
	}

	public void setFieldValues(Map<ContentField, String> fieldValues) {
		this.fieldValues = fieldValues;
	}
	

	@ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.MERGE})
	public ContentTemplate getTemplate() {
		return template;
	}

	public void setTemplate(ContentTemplate template) {
		this.template = template;
	}

}
