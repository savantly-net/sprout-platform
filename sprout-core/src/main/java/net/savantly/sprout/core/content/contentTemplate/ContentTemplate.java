package net.savantly.sprout.core.content.contentTemplate;

import javax.persistence.Column;
import javax.persistence.Entity;

import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
public class ContentTemplate extends PersistedDomainObject{
	
	private String name;
	private String description;
	private String content;
	
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

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

}
