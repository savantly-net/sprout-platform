package net.savantly.sprout.core.content.webPageContent;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import net.savantly.sprout.core.content.contentItem.ContentItem;
import net.savantly.sprout.core.content.webPage.WebPage;
import net.savantly.sprout.core.domain.PersistedDomainObject;

@Entity
public class WebPageContent extends PersistedDomainObject {

	private WebPage webPage;
	private String placeHolderId;
	private Set<ContentItem> contentItems = new HashSet<>();
	
	@ManyToOne
	public WebPage getWebPage() {
		return webPage;
	}
	public void setWebPage(WebPage webPage) {
		this.webPage = webPage;
	}
	
	public String getPlaceHolderId() {
		return placeHolderId;
	}
	public void setPlaceHolderId(String placeHolderId) {
		this.placeHolderId = placeHolderId;
	}
	@OneToMany(orphanRemoval=true, fetch=FetchType.EAGER)
	public Set<ContentItem> getContentItems() {
		return contentItems;
	}
	public void setContentItems(Set<ContentItem> contentItems) {
		this.contentItems = contentItems;
	}
}
