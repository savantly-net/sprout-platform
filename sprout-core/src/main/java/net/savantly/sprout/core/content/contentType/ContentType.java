package net.savantly.sprout.core.content.contentType;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
@Table(name="CONTENT_TYPE")
public class ContentType extends PersistedDomainObject{
	
	private String name;
	private String description;
	@JsonIgnoreProperties("contentType")
	private Set<ContentField> fields = new HashSet<>();
	private boolean requiresTemplate = true;
	
	private boolean updateable;
	private String icon;

	@Column(unique=true)
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

	@OneToMany(mappedBy="contentType", orphanRemoval=true, cascade= {CascadeType.ALL}, fetch=FetchType.EAGER)
	public Set<ContentField> getFields() {
		return fields;
	}

	public void setFields(Set<ContentField> fields) {
		this.fields = fields;
	}

	public boolean isUpdateable() {
		return updateable;
	}

	public void setUpdateable(boolean updateable) {
		this.updateable = updateable;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public boolean isRequiresTemplate() {
		return requiresTemplate;
	}

	public void setRequiresTemplate(boolean requiresTemplate) {
		this.requiresTemplate = requiresTemplate;
	}

}
