package net.savantly.sprout.core.content.contentTemplate;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import net.savantly.sprout.core.content.contentItem.ContentItem;
import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
public class ContentTemplate extends PersistedDomainObject{
	
	private String name;
	private String description;
	private String content;
	private Set<ContentItem> contentItems = new HashSet<ContentItem>();
	
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

	@OneToMany
	public Set<ContentItem> getContentItems() {
		return contentItems;
	}

	public void setContentItems(Set<ContentItem> contentItems) {
		this.contentItems = contentItems;
	}

}
