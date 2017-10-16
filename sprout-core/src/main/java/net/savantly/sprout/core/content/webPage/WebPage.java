package net.savantly.sprout.core.content.webPage;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MapKeyColumn;

import net.savantly.sprout.core.content.contentItem.ContentItem;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayout;
import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
public class WebPage extends PersistedDomainObject {
	private String name;
	private String description;
	private WebPageLayout webPageLayout;
	private Map<String, ContentItem> contentItems = new HashMap<>();
	
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
	
	@ManyToOne
	public WebPageLayout getWebPageLayout() {
		return webPageLayout;
	}
	public void setWebPageLayout(WebPageLayout webPageLayout) {
		this.webPageLayout = webPageLayout;
	}
	
	@ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name = "WEB_PAGE_CONTENT")
	@MapKeyColumn(name="PLACEHOLDER_ID")
	@Column(name = "CONTENT_ID")
	public Map<String, ContentItem> getContentItems() {
		return contentItems;
	}
	public void setContentItems(Map<String, ContentItem> contentItems) {
		this.contentItems = contentItems;
	}
}
