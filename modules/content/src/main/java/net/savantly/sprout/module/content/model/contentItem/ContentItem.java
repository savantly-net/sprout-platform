package net.savantly.sprout.module.content.model.contentItem;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.MapKeyColumn;
import javax.persistence.Table;

import net.savantly.sprout.core.domain.PersistedDomainObject;
import net.savantly.sprout.module.content.model.contentField.ContentField;
import net.savantly.sprout.module.content.model.contentTemplate.ContentTemplate;
import net.savantly.sprout.module.content.model.contentType.ContentType;

@Entity
@Table(name="CONTENT_ITEM")
public class ContentItem extends PersistedDomainObject{

	@Column(unique=true)
	private String name;
	private String description;
	
	@ManyToOne
	private ContentType contentType;
	
	@Lob
	@ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name = "FIELD_VALUES", joinColumns = @JoinColumn(name = "CONTENT_ITEM_ID"))
	@MapKeyColumn(name="CONTENT_FIELD_ID")
	@Column(name = "CONTENT_FIELD_VALUE")
	private Map<ContentField, String> fieldValues = new HashMap<>();
	
	@ManyToOne
	private ContentTemplate template;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public ContentType getContentType() {
		return contentType;
	}

	public void setContentType(ContentType contentType) {
		this.contentType = contentType;
	}

	public Map<ContentField, String> getFieldValues() {
		return fieldValues;
	}

	public void setFieldValues(Map<ContentField, String> fieldValues) {
		this.fieldValues = fieldValues;
	}
	
	public ContentTemplate getTemplate() {
		return template;
	}

	public void setTemplate(ContentTemplate template) {
		this.template = template;
	}

}