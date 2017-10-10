package net.savantly.sprout.core.content.contentType;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import net.savantly.sprout.core.content.contentField.ContentField;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplate;
import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
public class ContentType extends PersistedDomainObject{
	
	private String name;
	private List<ContentField> fields = new ArrayList<>();;
	private ContentTemplate template;
	private boolean updateable;

	@Column(unique=true)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@OneToMany(mappedBy="contentType", orphanRemoval=true, cascade= {CascadeType.ALL}, fetch=FetchType.EAGER)
	public List<ContentField> getFields() {
		return fields;
	}

	public void setFields(List<ContentField> fields) {
		this.fields = fields;
	}

	@ManyToOne(cascade= {CascadeType.PERSIST})
	public ContentTemplate getTemplate() {
		return template;
	}

	public void setTemplate(ContentTemplate template) {
		this.template = template;
	}

	public boolean isUpdateable() {
		return updateable;
	}

	public void setUpdateable(boolean updateable) {
		this.updateable = updateable;
	}

}
